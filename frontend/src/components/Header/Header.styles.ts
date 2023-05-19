export const styles = {
  header: {
    paddingX: 5,
    minHeight: 100,
    backgroundColor: "backgroundPrimary",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLogo: {
    display: "flex",
    alignItems: "center",
    gap: 2
  },
  notificationWrapper: {
    position: "relative",
    cursor: "pointer"
  },
  notificationCircle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(10px, 10px)"
  },
  headerRoutes: {
    display: "flex",
    gap: 5,
    alignItems: "center"
  },
  notificationMessages: {
    width: "500px",
    position: "absolute",
    zIndex: 1,
    padding: 3,
    backgroundColor: "backgroundSecondary",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: 1
  },
  notificationMessageText: {
    ":hover": {
      backgroundColor: "callToAction"
    }
  }
};
