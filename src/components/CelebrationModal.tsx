import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Gift, Sparkles } from 'lucide-react';

interface CelebrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    rewardTitle: string;
    coinsSpent: number;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({
    isOpen,
    onClose,
    rewardTitle,
    coinsSpent
}) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        const updateDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
            // Stop confetti after 4 seconds
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <>
            {showConfetti && (
                <Confetti
                    width={windowDimensions.width}
                    height={windowDimensions.height}
                    numberOfPieces={200}
                    gravity={0.1}
                    colors={['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']}
                />
            )}

            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 border-2 border-success/20">
                    <div className="flex flex-col items-center text-center space-y-6 p-6">
                        {/* Success Icon with Animation */}
                        <div className="relative">
                            <div className="animate-pulse absolute inset-0 bg-success/20 rounded-full scale-150"></div>
                            <div className="relative bg-success/10 p-4 rounded-full border-2 border-success/30">
                                <CheckCircle className="h-16 w-16 text-success animate-bounce" />
                            </div>
                            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-spin" />
                        </div>

                        {/* Celebration Text */}
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold text-success animate-pulse">
                                🎉 Congratulations! 🎉
                            </h2>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold text-gray-800">
                                    You've successfully redeemed:
                                </p>
                                <div className="bg-white/80 rounded-lg p-4 border border-success/30">
                                    <div className="flex items-center justify-center space-x-2 mb-2">
                                        <Gift className="h-5 w-5 text-primary" />
                                        <span className="text-xl font-bold text-primary">{rewardTitle}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        For {coinsSpent} coins
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 animate-fade-in">
                                Your reward will be processed shortly. Check your notifications for updates!
                            </p>
                        </div>

                        {/* Action Button */}
                        <Button
                            onClick={onClose}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-2 animate-bounce"
                        >
                            Awesome! 🚀
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CelebrationModal;