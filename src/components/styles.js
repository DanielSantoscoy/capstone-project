// ./src/styles

import { BackgroundColor, white } from "chalk";

const primaryAccent = "rgba(173,119,235, 1)";
const secondaryAccent = "rgba(216,166,29, 1)";
const textColor = "rgba(255, 255, 255, 1)";
const themeLite = "rgba(255, 255, 255, 1)";
const themeMain = "rgba(61,47,117, 1)";
const themeDark = "rgba(48,48,48, 1)";
const postColor = "rgba(8,8,73, 0.7)";
const drawerWidth = "20rem";
const navHeight = "7rem";

const muiTheme = {
    palette: {
        primary: {
            light: "#3c2e75",
            main: "#080849",
            dark: "#000023",
        },
        secondary: {
            light: "#e5adff",
            main: "#b17de8",
            dark: "#7f4fb5",
        },
    },
};

const navStyling = {
    // Nav

    nav: {
        justifyContent: "space-between",
        background: themeMain,
        alignItems: "center",
        height: navHeight,
        diplay: "flex",
        zIndex: 1301,
        boxShadow: `0 1px 75px -13px ${secondaryAccent}`,
    },

    navHeader: {
        zIndex: 1301,
    },

    // Logo Area

    leftNav: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
    },

    logo: {
        borderRight: `2px solid ${secondaryAccent}`,
        margin: "1rem 1rem 1rem 0.5rem",
        paddingRight: "1rem",
        width: "6rem",
        height: "auto",
    },

    explore: {
        boxShadow: ` 0 1px 4px ${secondaryAccent} `,
        opacity: "92%",
    },

    // Search Area
    mainSearch: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        width: "55vw",
    },

    mainSearchInput: {
        boxShadow: `0 0 4px ${primaryAccent}`,
        borderRadius: "10px",
        fontSize: "1.1rem",
        padding: "0.5rem",
        width: "50vw",
        height: "2rem",
        border: "none",

        "&:focus": {
            outline: "none",
        },
    },

    // icons

    icons: {
        "&:hover": {
            fontSize: "1.7rem",
        },
    },
};

const accordionStyling = {
    // Accordions

    accountAccordion: {
        boxShadow: ` 0 0 7px -4px black`,
        paddingRight: "0",
        paddingLeft: "0",

        "&:hover": {
            boxShadow: `0 0 8px ${secondaryAccent}`,
        },
    },

    accordionRoot: {
        background: "rgba(255, 255, 255, 0.75)",
        width: "100%",
    },

    accountListItem: {
        padding: 0,
        marginBottom: "1.5rem",
        width: "99%",
    },

    //Accordion Header

    headerTitle: {
        padding: "0 0.7rem",
        fontSize: "1.6rem",
        width: "100%",
        "&:hover": {
            fontSize: "1.7rem",
        },
    },

    //Accordion Body

    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
    },

    submit: {
        width: "40%",
        margin: "1rem 0 0.5rem 0",
    },

    //Settings

    comingSoon: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
    },

    settings: {
        fontSize: "2rem",
        width: "100%",
        textAlign: "center",
    },

    //Log out
    logOut: {
        "&:hover": {
            background: "rgba(125,8,8, 0.85)",
            boxShadow: "0 0 6px rgba(125,8,8, 1)",
        },
    },

    // Cart

    cartListItem: {
        padding: 0,
        width: "99%",
    },

    cartAccordion: {
        boxShadow: ` 0 -1px 8px ${primaryAccent} `,
        paddingRight: "0",
        paddingLeft: "0",
    },

    cartAccordionDetails: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
    },

    cartHeaderTitle: {
        padding: "0 0.7rem",
        fontSize: "0.9rem",
        width: "65%",
    },

    cartHeaderDiv: {
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.7rem",
        flexWrap: "wrap",
        display: "flex",
        flexBasis: "1",
        width: "100%",
    },

    cartHeaderPrice: {
        padding: "0 0.7rem",
        fontSize: "0.8rem",
        textAlign: "right",
        width: "35%",
    },

    // Cart Body

    productImage: {
        width: `calc( ${drawerWidth} - 80% )`,
        boxShadow: "0 0 2px black",
        marginTop: "0.5rem",
        height: "auto",
        flexGrow: 3,
    },

    productInfo: {
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "0.3rem",
        display: "flex",
        flexGrow: 1,
    },

    qtyContainer: {
        justifyContent: "space-between",
        flexDirection: "column",
        marginBottom: "1.6rem",
        marginLeft: "0.3rem",
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
    },

    qty: {
        marginBottom: "0.5rem",
        textAlign: "center",
        fontSize: "0.8rem",
    },

    qtyCount: {
        boxShadow: "0 0 3px black",
        borderColor: "transparent",
        borderRadius: "5px",
        textAlign: "center",
        height: "2rem",
        width: "4rem",
    },

    priceContainer: {
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "0.3rem",
        marginBottom: "1rem",
        display: "flex",
        flexGrow: 1,
    },

    priceLabel: {
        marginBottom: "0.3rem",
        textAlign: "center",
        fontSize: "0.8rem",
    },

    priceAmount: {
        fontSize: "0.75rem",
    },
};

const drawerStyling = {
    // Drawer
    drawer: {
        overflowX: "hidden",
        width: drawerWidth,
        flexShrink: 0,
    },

    drawerPaper: {
        backgroundColor: "rgba(90,68,179, 0.98)",
        width: drawerWidth,
        color: textColor,
    },

    drawerContainer: {
        overflow: "auto",
    },

    blankSpaceAccount: {
        height: `calc(${navHeight} + 1.5rem)`,
    },

    blankSpaceCart: {
        height: `calc(${navHeight} + 1rem)`,
    },

    wrapper: {
        flexDirection: "column",
        position: "relative",
        alignItems: "center",
        display: "flex",
    },

    // Accordions
    accordionRoot: {
        background: "rgba(255, 255, 255, 0.75)",
        width: "100%",
    },

    list: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    //Accordion Header

    headerTitle: {
        padding: "0 0.7rem",
        fontSize: "1.6rem",
        width: "100%",
    },

    //Accordion Body
    form: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
    },

    input: {
        width: "85%",
        marginBottom: "1rem",
    },

    firstInput: {
        marginTop: "1rem",
    },

    submit: {
        width: "40%",
        margin: "1rem 0 0.5rem 0",
    },

    // Sub-Total
    subTotal: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },

    subTotalAmount: {
        fontWeight: "bold",
    },
};

const inputStyling = {
    input: {
        width: "85%",
        marginBottom: "1rem",
    },
    firstInput: {
        marginTop: "1rem",
    },
};

const checkOutBtnStyling = {
    checkout: {
        background: secondaryAccent,
        width: "95%",
        marginBottom: "0.5rem",

        "&:hover": {
            background: "rgba(241,180,11,1)",
        },
    },
};

const removeBtnStyling = {
    removeBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "10px",
    },

    removeBtn: {
        background: "rgba(146,8,8, 1)",
        boxShadow: "0 0 2px black",
        padding: "8px 0",
        width: "100%",

        "&:hover": {
            background: "rgba(125,8,8, 1)",
        },
    },

    trashIcon: {
        width: "1rem",
    },
};

const checkoutStyling = {
    wholeComponent: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
        height: "100%",
        margin: 0,
        border: 0,
    },

    header: {
        textShadow: `2px 2px black`,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: textColor,
        display: "flex",
        width: "100%",
    },

    checkoutAccordion: {
        boxShadow: `0 -2px 20px -5px ${secondaryAccent}`,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "25px",
        marginRight: "auto",
        textAlign: "center",
        background: "white",
        marginLeft: "auto",
        color: textColor,
        display: "flex",
        width: "100%",
        padding: 30,
    },

    checkoutForm: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "none",
        display: "flex",
        width: "70%",
    },

    formControl: {
        minWidth: 170,
        margin: 1,
    },
    inputLabel: {
        paddingLeft: "30px",
        color: "rgb(90, 90, 90)",
        paddingRight: "20px",
    },

    selectEmpty: {
        marginTop: 2,
    },

    checkoutModalStyle: {
        marginBottom: "1em",
        textAlign: "center",
        marginTop: "1em",
    },

    buttonContainer: {
        justifyContent: "space-between",
        marginBottom: "3rem",
        marginTop: "3rem",
        display: "flex",
        width: "85%",
    },

    completeButton: {
        marginRight: "2rem",
    },

    headerText: {
        fontSize: "2rem",
        width: "100%",
    },

    headerWrapper: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },

    iconPadding: {
        paddingRight: "1rem",
    },

    accordionDetails: {
        backgroundImage: "url('/assets/input_bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        padding: "2rem 4rem 1rem 4rem",
        justifyContent: "center",
        borderRadius: "10px",
        alignItems: "center",
        width: "100%",
    },

    accordionDetailsPayment: {
        backgroundImage: "url('/assets/input_bg.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        padding: "2rem 4rem 1rem 4rem",
        justifyContent: "center",
        borderRadius: "10px",
        alignItems: "center",
        width: "100%",
    },

    accordionSummary: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    accordionSummaryContent: {
        justifyContent: "center",
    },

    inputBoxRight: {
        boxShadow: "0 0 3px rgba(216,166,29, 0.4)",
        background: "rgba(255, 255, 255, 0.85)",
        borderRadius: "10px",
    },

    inputBoxLeft: {
        boxShadow: "0 0 3px rgba(216,166,29, 0.4)",
        background: "rgba(255, 255, 255, 0.85)",
        margin: "0 1rem 1rem 0",
        borderRadius: "10px",
    },

    paymentIcon: {
        marginRight: "0.5rem",
        fontSize: "2rem",
    },

    flightIcon: {
        marginRight: "0.5rem",
        fontSize: "2rem",
    },

    listIcon: {
        marginRight: "0.5rem",
        fontSize: "2.5rem",
    },

    moneyIcon: {
        fontSize: "2.2rem",
    },

    // Order Summary
    orderSummary: {
        boxShadow: `0 1px 10px -1px ${secondaryAccent}`,
        background: "rgba(0, 0, 0, 0.93)",
        backgroundImage: "url('/assets/input_bg.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        flexDirection: "column",
        padding: "2rem 4rem",
        borderRadius: "10px",
        marginTop: "2rem",
        display: "flex",
        width: "90%",
    },

    orderSummaryHeader: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "3rem",
        color: textColor,
    },

    cartEmpty: {
        boxShadow: `0 1px 10px -1px ${secondaryAccent}`,
        background: "rgba(0, 0, 0, 0.93)",
        backgroundImage: "url('/assets/input_bg.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        borderRadius: "10px",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: "3rem",
        color: textColor,
        fontSize: "3rem",
        padding: "3rem",
        width: "90%",
    },

    summaryLineItem: {
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "0.7rem",
        color: textColor,
        display: "flex",
    },

    processingFee: {
        borderBottom: "3px solid white",
        paddingBottom: "1rem",
    },

    grandTotalHeader: {
        paddingTop: "0.3rem",
        fontWeight: "bolder",
        fontSize: "1rem",
    },
    grandTotalAmount: {
        borderTop: "3px solid black",
        paddingTop: "0.3rem",
        fontWeight: "bold",
        fontSize: "1rem",
    },

    buttonsStyle: {
        boxShadow: `0 2px 54px -3px ${secondaryAccent}`,
        background: "rgba(0, 0, 0, 0.97)",
        borderRadius: "8px",
        fontSize: "0.9rem",

        "&:hover": {
            boxShadow: `0 2px 54px 10px ${secondaryAccent}`,
            background: "rgb(62,77,50)",
        },
    },

    formLabel: {
        color: textColor,
    },

    radio: {
        boxShadow: "0 0 3px rgba(216,166,29, 0.4)",
        background: "rgba(255, 255, 255, 0.85)",
        borderRadius: "10px",
        padding: "0.5rem 2rem 0.5rem 0.8rem",
        marginRight: "2rem",
        color: "rgb(90,90,90)",
    },

    dropDown: {
        boxShadow: "0 0 3px rgba(216,166,29, 0.4)",
        background: "rgba(255, 255, 255, 0.75)",
        color: "rgb(90,90,90)",
        borderRadius: "10px",
        marginRight: "2rem",

        "&:hover": {
            background: "rgba(255, 255, 255, 0.75)",
        },
    },

    paymentInput: {
        background: "rgba(255, 255, 255, 0.85)",
        borderRadius: "10px",
        marginRight: "2rem",
        color: "rgb(90,90,90)",
    },
};

const productCardStyling = {
    cardSize: {
        height: "100%",
    },

    sectionTitle: {
        color: textColor,
        textShadow: `0 1px 3px ${secondaryAccent}`,
        fontSize: "4rem",
    },

    productTitle: {
        textShadow: `0 1px 3px ${secondaryAccent}`,
        marginBottom: "1rem",
        fontSize: "1.7rem",
        paddingBottom: 10,
        paddingRight: 10,
        color: textColor,
        paddingLeft: 10,
        paddingTop: 10,
    },

    productTitleHover: {
        textShadow: `0 1px 3px ${secondaryAccent}`,
        marginBottom: "1rem",
        fontSize: "1.8rem",
        cursor: "pointer",
        paddingBottom: 10,
        paddingRight: 10,
        color: textColor,
        paddingLeft: 10,
        paddingTop: 10,
    },

    productDescription: {
        justifyContent: "center",
        marginTop: "0.3rem",
        padding: 10,
    },

    productContentBottom: {
        justifyContent: "center",
        marginTop: "1rem",
        padding: 10,
    },
    ratingContainer: {
        justifyContent: "center",
        paddingTop: 5,
    },
    cardButtons: {
        justifyContent: "center",
    },

    hide: {
        display: "none",
    },

    addToCart: {
        // background: "rgba(216,166,29, 0.7)",
        boxShadow: `0 0 5px ${secondaryAccent}`,
        background: "rgba(0, 0, 0, 0.85)",
        position: "absolute",
        borderRadius: "5px",
        paddingBottom: "0",
        fontSize: "3rem",
        paddingTop: "0",
        color: "white",
        width: "80%",
        left: "2.8rem",
        top: "15rem",

        "&:hover": {
            cursor: "pointer",
        },
    },

    ratingStyle: {
        position: "absolute",
        fontSize: "3rem",
        top: "19.5rem",
        left: "6rem",

        "&:hover": {
            cursor: "pointer",
        },
    },

    priceAndQty: {
        justifyContent: "space-evenly",
        alignItem: "center",
        display: "flex",
    },

    gridRoot: {
        width: "100%",
    },
};

const productViewStyling = {
    productContainer: {
        color: "#ffffff",
        paddingLeft: "75px",
        paddingRight: "75px",
        background: "#3d2f75",
    },
    rightContainer: {
        height: "100%",
    },
    leftContainer: {
        height: "100%",
        padding: 40,
    },
    productViewTitle: {
        paddingTop: 10,
        paddingBottom: 10,
        background: "#ad77eb",
        color: "#ffffff",
    },
    productViewPrice: {},
    productViewMedia: {
        padding: 20,
    },
    productViewContent: {
        paddingBottom: 10,
    },
    productViewButtons: {
        justifyContent: "center",
        background: "#ad77eb",
    },
};

const storeContentStyling = {
    storeContent: {
        boxShadow: `0 1px 23px -5px ${secondaryAccent}`,
        background: "rgba(0, 0, 0, 0.96)",
        paddingBottom: "1rem",
        marginBottom: "20rem",
        borderRadius: "18px",
        marginTop: "28rem",
        width: "100%",
    },
    sectionTitle: {
        textShadow: `0 1px 3px ${secondaryAccent}`,
        marginLeft: "3rem",
        paddingTop: "3rem",
        color: textColor,
        fontSize: "4rem",
    },
};

const storeHeaderStyling = {
    storeHeader: {
        boxShadow: `0 1px 23px -5px ${secondaryAccent}`,
        borderRadius: "5px 5px 17px 17px",
        background: "rgba(0, 0, 0, 0.96)",
        justifyContent: "center",
        padding: "3.5rem 0",
        fontSize: "4.5rem",
        color: "#ffffff",
        display: "flex",
        width: "100%",
        height: "40%",
    },

    storeLogo: {
        height: "auto",
        width: "25rem",
    },
};

const noticeStyling = {
    noticeStyle: {
        width: `calc(${drawerWidth} - 1.5rem)`,
        right: "11px",
    },
    alertRoot: {
        width: `calc(${drawerWidth} - 1.5rem)`,
        alignItems: "center",
        textAlign: "center",
        display: "flex",
        opacity: 0.8,
    },
};

const appStyling = {
    appStyle: {
        backgroundImage: "url('/assets/bg_8.jpg')",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
    },
};

// variables
const variables = {
    storeContentStyling,
    storeHeaderStyling,
    productCardStyling,
    productViewStyling,
    checkOutBtnStyling,
    removeBtnStyling,
    accordionStyling,
    checkoutStyling,
    secondaryAccent,
    drawerStyling,
    noticeStyling,
    primaryAccent,
    inputStyling,
    drawerWidth,
    appStyling,
    navStyling,
    themeMain,
    navHeight,
    themeLite,
    themeDark,
    textColor,
    postColor,
    muiTheme,
};

export default variables;