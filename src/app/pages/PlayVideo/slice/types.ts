/* --- STATE --- */
export interface ManagePlayVideoState {
  videoUrl?: string;
  thumbnail?: string;
  currentlyWatching?: {
    name?: string;
    description?: string;
    duration?: number;
    poster?: string;
  };
}
