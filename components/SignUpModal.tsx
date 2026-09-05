"use client";

import ConnectProfileModal, { UserProfile } from "@/components/ConnectProfileModal";

export type { UserProfile };

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: UserProfile) => void;
  userProfile?: UserProfile | null;
}

export default function SignUpModal({
  isOpen,
  onClose,
  onComplete,
  userProfile,
}: SignUpModalProps) {
  return (
    <ConnectProfileModal
      isOpen={isOpen}
      onClose={onClose}
      onComplete={onComplete}
      existingProfile={userProfile}
    />
  );
}
