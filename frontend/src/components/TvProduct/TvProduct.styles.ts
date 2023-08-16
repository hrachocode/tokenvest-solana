export const styles = {
  productWrapper: {
    minWidth: 330,
    height: 469,
    borderRadius: "20px",
    backgroundColor: "backgroundSecondary",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    ":hover": {
      opacity: 0.9
    },
  },
  productWrapperWide: {
    minWidth: 510,
    height: 469,
    borderRadius: "20px",
    backgroundColor: "backgroundSecondary",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    ":hover": {
      opacity: 0.9
    },
  },
  productWrapperComplete: {
    minWidth: 330,
    minHeight: 469,
    borderRadius: "20px",
    backgroundColor: "backgroundSecondary",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    opacity: 0.5,
  },
  productComplete: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "150px",
    height: "150px",
    backgroundColor: "backgroundPrimary",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "24px",
    transform: "translate(-50%,-100%)"
  },
  productImage: {
    width: "100%",
    minHeight: 295,
    backgroundSize: "100% 100%",
    borderRadius: "20px 20px 0 0"
  },
  productInfoWrapper: {
    paddingX: 3,
    paddingY: 2,
    display: "flex",
    flexDirection: "column"
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "5px"
  },
  userAvatar: {
    borderRadius: "50%",
    backgroundColor: "backgroundPrimary",
    width: 24,
    height: 24
  },
  raiseInfoWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "25px"
  },
  raiseInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  }
};
