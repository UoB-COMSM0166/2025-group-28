class UniversalUI {
  static forwardStepper(parent) {
    let element = createP("+");

    element.style("color", "white");
    element.style("text-align", "center");
    element.style("font-size", "28px");
    element.style("background-color", gameOrange);
    element.parent(parent);
    element.attribute("draggable", "false");
    element.size(35, 35);
    return element;
  }

  static backStepper(parent) {
    let element = createP("-");
    element.style("color", "white");
    element.style("font-size", "28px");
    element.style("text-align", "center");

    element.style("background-color", gameOrange);
    element.parent(parent);
    element.attribute("draggable", "false");
    element.size(35, 35);

    return element;
  }

  static stepperUpdate(min, max, val, down, up, increment) {
    if (val + increment >= min && val + increment <= max) {
      val += increment;
    }
    if (val == min) {
      down.style("background-color", "gray");
    } else {
      down.style("background-color", gameOrange);
    }
    if (val == max) {
      up.style("background-color", "gray");
    } else {
      up.style("background-color", gameOrange);
    }

    return val;
  }
}
