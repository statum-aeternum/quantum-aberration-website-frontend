export const getGalaxyAssets = () => {
  const w = window.innerWidth;

  if (w < 768) {
    return {
      stars: "/galaxy/mobile_stars.png",
      nebula: "/galaxy/mobile_nebula.png",
      dust: "/galaxy/mobile_dust.png",
      rays: "/galaxy/mobile_rays.png",
    };
  }

  if (w < 1400) {
    return {
      stars: "/galaxy/tablet_stars.png",
      nebula: "/galaxy/tablet_nebula.png",
      dust: "/galaxy/tablet_dust.png",
      rays: "/galaxy/tablet_rays.png",
    };
  }

  return {
    stars: "/galaxy/desktop_stars.png",
    nebula: "/galaxy/desktop_nebula.png",
    dust: "/galaxy/desktop_dust.png",
    rays: "/galaxy/desktop_rays.png",
  };
};
