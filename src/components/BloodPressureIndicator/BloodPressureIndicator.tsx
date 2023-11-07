import { useEffect, useState } from "react";
import "./BloodPressureIndicator.css";
import { BloodPressureService } from "../../services/blood-pressure.service";
import { BloodPressureIndicatorProps } from "../../props/BloodPressureIndicator.Props";
import { BloodPressureCategoryIdentifier } from "../../models/blood-pressure-models/category-identifier.model";
import { BloodPressureCategory } from "../../models/blood-pressure-models/bp-abstract-category.model";

const BloodPressureIndicator = (props: BloodPressureIndicatorProps) => {
  const [sysIndicatorValue, setSysCategoryIdentifier] = useState("");
  const [diaIndicatorValue, setDiaCategoryIdentifier] = useState("");
  const bloodPressureService: BloodPressureService = new BloodPressureService();
  const categoryIdentifier: BloodPressureCategoryIdentifier =
    new BloodPressureCategoryIdentifier();

    useEffect(() => {
      initialize();
    }, [props]);
  
  const initialize = () => {
    let sysIndicatorValue: string = getSysIndicatorValue(props.sys);
    setSysCategoryIdentifier(sysIndicatorValue);
    let diaIndicatorValue: string = getDiaIndicatorValue(props.dia);
    setDiaCategoryIdentifier(diaIndicatorValue);
  };

  const getSysIndicatorValue = (sys: number) => {
    try {
      let category: BloodPressureCategory =
        bloodPressureService.getSysBloodPressure(sys);
      return category.acceptVisitor(categoryIdentifier);
    } catch (err) {
      return "";
    }
  };

  const getDiaIndicatorValue = (dia: number) => {
    try {
      let category: BloodPressureCategory =
        bloodPressureService.getDiaBloodPressure(dia);
      return category.acceptVisitor(categoryIdentifier);
    } catch (err) {
      return "";
    }
  };

  const [] = useState(() => {
    initialize();
  });

  return (
    <div className="card bp-indicator-card">
      <div className="card-body">
        <h4 className="card-title">{props.title}</h4>
        <div className="bp-blood-pressure-container">
          <div className="bp-sys-blood-pressure-container">
            <h6>Systolic: {props.sys}</h6>
            <div className="bp-category-container">
              <div className="card" id="bp-optimal-card">
                <div className="card-body bp-category-card-body">
                  {sysIndicatorValue == "optimal" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Optimal <br /> Sys: &lt;120 <br />
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card bp-category-card" id="bp-normal-card">
                <div className="card-body bp-category-card-body">
                  {sysIndicatorValue == "normal" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Normal <br /> Sys: 120-129 <br />
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card bp-category-card" id="bp-high-normal-card">
                <div className="card-body bp-category-card-body">
                  {sysIndicatorValue == "hnormal" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  High Normal <br /> Sys: 130-139 <br />
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card bp-category-card" id="bp-grade-i-card">
                <div className="card-body bp-category-card-body">
                  {sysIndicatorValue == "gradei" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Grade I Hypertension <br /> Sys: 140–159 <br />
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card bp-category-card" id="bp-grade-ii-card">
                <div className="card-body bp-category-card-body">
                  {sysIndicatorValue == "gradeii" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Grade II Hypertension <br /> Sys: 160–179 <br />
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card bp-category-card" id="bp-grade-iii-card">
                <div className="card-body bp-category-card-body">
                  {sysIndicatorValue == "gradeiii" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Grade III Hypertension <br /> Sys: &ge; 180
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div className="bp-dia-blood-pressure-container">
            <h6>Diastolic: {props.dia}</h6>
            <div className="bp-category-container">
              <div className="card" id="bp-optimal-card">
                <div className="card-body bp-category-card-body">
                  {diaIndicatorValue == "optimal" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Optimal <br /> 
                  Dia: &lt;80
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card bp-category-card" id="bp-normal-card">
                <div className="card-body bp-category-card-body">
                  {diaIndicatorValue == "normal" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Normal <br /> 
                  Dia: 80-84
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card category-card" id="bp-high-normal-card">
                <div className="card-body bp-category-card-body">
                  {diaIndicatorValue == "hnormal" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  High Normal <br />
                  Dia: 85-89
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card bp-category-card" id="bp-grade-i-card">
                <div className="card-body bp-category-card-body">
                  {diaIndicatorValue == "gradei" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Grade I Hypertension <br /> 
                  Dia: 90–99
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card bp-category-card" id="bp-grade-ii-card">
                <div className="card-body bp-category-card-body">
                  {diaIndicatorValue == "gradeii" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Grade II Hypertension <br />
                  Dia: 100–109
                </p>
              </div>
            </div>
            <div className="bp-category-container">
              <div className="card bp-category-card" id="bp-grade-iii-card">
                <div className="card-body bp-category-card-body">
                  {diaIndicatorValue == "gradeiii" ? (
                    <span className="bp-check-dot"></span>
                  ) : null}
                </div>
              </div>
              <div className="bp-category-description-container">
                <p>
                  Grade III Hypertension 
                  <br />
                  Dia: &ge;110
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureIndicator;
