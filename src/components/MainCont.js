import React, { useCallback } from "react";
import PropNav from "./PropNav";
import PipeParams from "./PipeParams";
import FluidCond from "./FluidCond";
import PumpSpecs from "./PumpSpecs";
import Documentation from "./Documentation";
import { useSelector, useDispatch } from "react-redux";
// import PropTypes from "prop-types";
import { calculatePipeSize } from "../actions/mainContActions";

const MainCont = () => {
 
  const schedule = useSelector((store) => store.schedule);
  const straightLength = useSelector((store) => store.straightLength);
  const roughness = useSelector((store) => store.roughness);
  const flowRate = useSelector((store) => store.flowRate);
  const density = useSelector((store) => store.density);
  const viscosity = useSelector((store) => store.viscosity);
  const pumpDischarge = useSelector((store) => store.pumpDischarge);
  const commentText = useSelector((store) => store.commentText);

  const actionDispatch = useDispatch();
  const calculatePipeSizeDispatch = useCallback(
    (schedule, straightLength, roughness, flowRate, density, viscosity, pumpDischarge, commentText ) =>
      actionDispatch(
        calculatePipeSize(
          schedule,
          straightLength,
          roughness,
          flowRate,
          density,
          viscosity,
          pumpDischarge,
          commentText
        )
      ),
    [actionDispatch]
  );
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <div className="wizard-container">
            <div className="card wizard-card" data-color="purple" id="wizard">
              <form action="" method="">
                <div className="wizard-header">
                  <h3 className="wizard-title">Pied Piper</h3>
                  <h5>Easy to use Pipe Sizing Software.</h5>
                </div>
                <PropNav />
                <div className="tab-content">
                  <PipeParams />
                  <FluidCond />
                  <PumpSpecs />
                  <Documentation />
                </div>
                <div className="wizard-footer">
                  <div className="pull-right">
                    <input
                      type="button"
                      className="btn btn-next btn-fill btn-primary btn-wd"
                      name="next"
                      value="Next"
                    />
                    <input
                      type="button"
                      className="btn btn-finish btn-fill btn-primary btn-wd"
                      name="finish"
                      value="Calculate"
                      // onClick={(e) => {
                      //   console.log("i have been clicked ooo");
                      // }}
                      onClick={(e) =>
                        calculatePipeSizeDispatch({
                          schedule,
                          straightLength,
                          roughness,
                          flowRate,
                          density,
                          viscosity,
                          pumpDischarge,
                          commentText,
                        })
                      }
                    />
                  </div>
                  <div className="pull-left">
                    <input
                      type="button"
                      className="btn btn-previous btn-fill btn-default btn-wd"
                      name="previous"
                      value="Previous"
                    />
                  </div>
                  <div className="clearfix"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCont;
