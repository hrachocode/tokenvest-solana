# tokenvest-polkadot

# Components
## TvButton
Button component, return the Button component from material ui wiht updated styles and options. Props are button props for material ui and a custom "customVariant" prop that alters the style of the button. "customVariant" is a string which is used as a key in order to get the preffered style from our custom buttonStyles object, can only be 'primary', 'secondary' or 'tertiary'.