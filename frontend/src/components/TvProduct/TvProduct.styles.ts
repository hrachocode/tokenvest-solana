export const styles = {
  productWrapper: {
    minWidth: 330,
    minHeight: 469,
    borderRadius: "20px",
    backgroundColor: "backgroundSecondary",
    display: "flex",
    flexDirection: "column",
    ":hover": {
      opacity: 0.9
    }
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
