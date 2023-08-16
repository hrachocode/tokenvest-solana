export const unitProductStyles = {
  popupWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "backgroundTransparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  wrapper: {
    paddingY: 4,
    display: "flex",
    flexDirection: "column"
  },
  infoWrapper: {
    mt: 3,
    display: "flex",
    justifyContent: "space-between",
  },
  detailsWrapper: {
    display: "flex",
    flexDirection: "column",
    ">div:not(:first-of-type)": {
      mt: 3
    }
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "5px"
  },
  userAvatar: {
    borderRadius: "50%",
    backgroundColor: "backgroundSecondary",
    width: 24,
    height: 24
  },
  productImage: {
    width: "100%",
    minHeight: 560,
    backgroundSize: "100% 100%",
    borderRadius: "20px"
  },
  investmentBox: {
    maxWidth: 295,
    backgroundColor: "backgroundSecondary",
    padding: 3,
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: 3
  },
  raiseInfoWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  raiseInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  }
};
