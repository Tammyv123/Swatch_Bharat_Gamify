import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Enhanced prompt for waste management assistance
    const systemPrompt = `You are an expert waste management assistant for the Swachh Nation Gamify platform. Your role is to provide accurate, helpful information about:

1. Waste segregation (wet, dry, hazardous waste)
2. Proper disposal methods for different types of waste
3. Recycling guidelines and tips
4. Composting techniques
5. E-waste management
6. Local waste management policies in India
7. Environmental impact of waste
8. Sustainable living practices

Guidelines:
- Keep responses concise but informative (2-3 sentences max unless complex topic)
- Use simple, easy-to-understand language
- Provide practical, actionable advice
- Reference Indian waste management practices when relevant
- If asked about non-waste topics, politely redirect to waste management
- Be encouraging and positive about environmental efforts

User message: ${message}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini response:', data);

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No response generated from Gemini API');
    }

    return new Response(JSON.stringify({ 
      response: generatedText.trim()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in waste-chatbot function:', error);
    
    // Provide fallback responses for common waste management questions
    const fallbackResponses = {
      segregation: "Separate waste into 3 categories: Wet (food scraps, biodegradable), Dry (plastic, paper, metal), and Hazardous (batteries, chemicals). This helps in proper recycling and disposal.",
      recycling: "Common recyclable items include plastic bottles, newspapers, cardboard, glass bottles, and metal cans. Clean them before disposal and check with local recycling centers for specific guidelines.",
      composting: "Start home composting with kitchen scraps like vegetable peels, fruit waste, and dry leaves. Avoid meat, dairy, and oily foods. Turn the compost regularly and keep it moist.",
      ewaste: "E-waste like old phones, laptops, and batteries should be given to authorized e-waste collectors or manufacturer take-back programs. Never throw them in regular bins."
    };

    const message = (await req.json().catch(() => ({ message: '' }))).message?.toLowerCase() || '';
    let fallbackResponse = "I apologize, I'm having technical difficulties. For waste management questions, please ensure proper segregation of wet, dry, and hazardous waste, and check with your local municipal corporation for disposal guidelines.";

    if (message.includes('segregat') || message.includes('separate')) {
      fallbackResponse = fallbackResponses.segregation;
    } else if (message.includes('recycl')) {
      fallbackResponse = fallbackResponses.recycling;
    } else if (message.includes('compost')) {
      fallbackResponse = fallbackResponses.composting;
    } else if (message.includes('electronic') || message.includes('e-waste')) {
      fallbackResponse = fallbackResponses.ewaste;
    }

    return new Response(JSON.stringify({ 
      response: fallbackResponse
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});