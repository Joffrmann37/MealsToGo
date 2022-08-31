import { Component } from "react";
import stylesJson from "../../styles.json";

class Utilities extends Component {
  static getStyles = (componentName, screenName) => {
    const styles = stylesJson.globalStyles.filter((globalStyle) => {
      return (
        globalStyle.name === screenName &&
        globalStyle.component === componentName
      );
    });
    return styles.length > 0 ? styles : [];
  };

  static getStyleString = (componentName, screenName) => {
    return Utilities.getStyles(componentName, screenName)[0].style;
  };
}

export default Utilities;
