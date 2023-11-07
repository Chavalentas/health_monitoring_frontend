import { useEffect, useState } from "react";
import "./BMIIndicator.css";
import { BMIService } from "../../services/bmi.service";
import { BMICategoryIdentifier } from "../../models/bmi-models/category-identifier.model";
import { BMIIndicatorProps } from "../../props/BMIIndicator.Props";
import { BMICategory } from "../../models/bmi-models/bmi-abstract-category.model";

const BMIIndicator = (props: BMIIndicatorProps) => {
  const [indicatorValue, setCategoryIdentifier] = useState("");
  const bmiService: BMIService = new BMIService();
  const categoryIdentifier: BMICategoryIdentifier = new BMICategoryIdentifier();

  useEffect(() => {
    initialize();
  }, [props]);

  const getIndicatorValue = (heightInM: number, weightInKg: number) => {
    try{
      let category: BMICategory = bmiService.getBMI(heightInM, weightInKg);
      return category.acceptVisitor(categoryIdentifier);
    }
    catch (err){
      return "";
    }
  }

  const initialize = () => {
    let indicatorValue: string = getIndicatorValue(props.heightInM, props.weightInKg);
    setCategoryIdentifier(indicatorValue);
  }

  const [] = useState(() => {
    initialize();
  });

  return (
    <div className="card bmi-indicator-card">
      <div className="card-body">
          <h4 className="card-title">{props.title}</h4>
          <h6>Height (in m): {props.heightInM}  Weight (in kg): {props.weightInKg}</h6>
          <div className="bmi-category-container">
            <div className="card bmi-category-card" id="bmi-severe-card">
              <div className="card-body bmi-category-card-body">
                {indicatorValue == "severe" ? (
                  <span className="bmi-check-dot"></span>
                ) : null}
              </div>
            </div>
            <div className="bmi-category-description-container">
              <p>
                Underweight (Severe thinness) 
                BMI: &lt;16.0
              </p>
            </div>
          </div>
          <div className="bmi-category-container">
            <div className="card bmi-category-card" id="bmi-moderate-card">
              <div className="card-body bmi-category-card-body">
                {indicatorValue == "moderate" ? (
                  <span className="bmi-check-dot"></span>
                ) : null}
              </div>
            </div>
            <div className="bmi-category-description-container">
            <p>
                Underweight (Moderate thinness)
                BMI: 16.0-16.9
              </p>
            </div>
          </div>
          <div className="bmi-category-container">
            <div className="card bmi-category-card" id="bmi-mild-card">
              <div className="card-body bmi-category-card-body">
                {indicatorValue == "mild" ? (
                  <span className="bmi-check-dot"></span>
                ) : null}
              </div>
            </div>
            <div className="bmi-category-description-container">
              <p>
                Underweight (Mild thinness) 
                BMI: 17.0-18.4
              </p>
            </div>
          </div>
          <div className="bmi-category-container">
            <div className="card bmi-category-card" id="bmi-normal-card">
              <div className="card-body bmi-category-card-body">
                {indicatorValue == "normal" ? (
                  <span className="bmi-check-dot"></span>
                ) : null}
              </div>
            </div>
            <div className="bmi-category-description-container">
              <p>
                Normal range BMI: 18.5-24.9
              </p>
            </div>
          </div>
          <div className="bmi-category-container">
            <div className="card bmi-category-card" id="bmi-overweight-card">
              <div className="card-body bmi-category-card-body">
                {indicatorValue == "overweight" ? (
                  <span className="bmi-check-dot"></span>
                ) : null}
              </div>
            </div>
            <div className="bmi-category-description-container">
              <p>
                Overweight (Pre-obese) BMI: 25.0-29.9
              </p>
            </div>
          </div>
          <div className="bmi-category-container">
            <div className="card bmi-category-card" id="bmi-obese-i-card">
              <div className="card-body bmi-category-card-body">
                {indicatorValue == "obesei" ? (
                  <span className="bmi-check-dot"></span>
                ) : null}
              </div>
            </div>
            <div className="bmi-category-description-container">
              <p>
                Obese (Class I) BMI: 30.0-34.9
              </p>
            </div>
          </div>
          <div className="bmi-category-container">
            <div className="card bmi-category-card" id="bmi-obese-ii-card">
              <div className="card-body bmi-category-card-body">
                {indicatorValue == "obeseii" ? (
                  <span className="bmi-check-dot"></span>
                ) : null}
              </div>
            </div>
            <div className="bmi-category-description-container">
              <p>
                Obese (Class II)
                BMI: 35.0-39.9
              </p>
            </div>
          </div>
          <div className="bmi-category-container">
            <div className="card bmi-category-card" id="bmi-obese-iii-card">
              <div className="card-body bmi-category-card-body">
                {indicatorValue == "obeseiii" ? (
                  <span className="bmi-check-dot"></span>
                ) : null}
              </div>
            </div>
            <div className="bmi-category-description-container">
              <p>
                Obese (Class III)
                BMI: &ge;40.0
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BMIIndicator;
