import { create } from 'zustand';

interface AdminState {
  bannerImage: string;
  customClasses: Record<string, string>;
  setBannerImage: (url: string) => void;
  setCustomClass: (elementId: string, className: string) => void;
  resetStore: () => void;
}

const defaultState = {
  bannerImage: 'https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fstatic.www.nfl.com%2Fimage%2Fupload%2Ft_q-best%2Fleague%2Fgduo2vythjwozlwuenzf',
  customClasses: {
    'banner-image': 'w-full object-cover object-left-bottom h-full sm:invisible md:visible lg:visible invisible'
  },
};

export const useAdminStore = create<AdminState>((set) => ({
  ...defaultState,
  setBannerImage: (url) => set({ bannerImage: url }),
  setCustomClass: (elementId, className) => 
    set((state) => ({
      customClasses: {
        ...state.customClasses,
        [elementId]: className
      }
    })),
  resetStore: () => set(defaultState),
}));