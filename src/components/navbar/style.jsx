// Side bar

export const sidebarContainerStyle = {
  transition: "3s ease",
  w: { base: "full", md: 72 },
  pos: "fixed",
  h: "full",
  zIndex: "overlay",
};

export const sidebarBrandContainer = {
  h: "20",
  alignItems: "center",
  px: "8",
  justifyContent: "space-between",
  borderBottom: "1px",
};

export const sidebarBrandStyle = {
  fontSize: "2xl",
  fontFamily: "monospace",
  fontWeight: "bold",
};

// Topbar Style
export const topbarContainer = {
  ml: { base: 0, md: 60 },
  px: { base: 4, md: 4 },
  height: "20",
  alignItems: "center",
  borderBottomWidth: "1px",
  zIndex: "overlay",
};

export const topbarBrandStyle = {
  display: { base: "flex", md: "none" },
  fontSize: "2xl",
  fontFamily: "monospace",
  fontWeight: "bold",
};

// Menu style
export const menuButtonStyle = {
  py: "2",
  transition: "all 0.3s",
  _focus: { boxShadow: "none" },
};
