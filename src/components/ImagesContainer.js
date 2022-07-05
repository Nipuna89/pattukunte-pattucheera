import range from "lodash/range";
import React from "react";
import { customStyles } from "../styles/styles";
import PropTypes from "prop-types";
import { GAME_STATUS, isProduction, MAX_ATTEMPTS } from "../utils/constants";

const ImagesContainer = ({
  buttonLogic,
  setButtonLogic,
  currentIndexFromButton,
  currentIndexFromStorage,
  setCurrentIndexFromButton,
  gameStatus,
  dayCount
}) => {
  //eslint-disable-next-line react/prop-types

  const buildImageUrl = (index) =>
    `${process.env.REACT_APP_CDN_URL}${
      isProduction() ? "/" + dayCount : ""
    }/${index.toString()}.jpg`;

  return (
    <div className="searchbox-container">
      <img
        alt=""
        className="movie-frame"
        src={
          buttonLogic
            ? buildImageUrl(currentIndexFromButton)
            : buildImageUrl(currentIndexFromStorage)
        }
        width="100%"
        height="100%"
      />
      <div className="searchbox-container guess-box" style={customStyles.marginTop}>
        {range(
          0,
          gameStatus !== GAME_STATUS.COMPLETED ? currentIndexFromStorage : MAX_ATTEMPTS
        ).map((index) => {
          return (
            <button
              key={index}
              style={{ ...customStyles.marginLeft }}
              onClick={() => {
                setCurrentIndexFromButton(index + 1);
                setButtonLogic(true);
              }}
              className={
                "count-btn " +
                (index + 1 === (buttonLogic ? currentIndexFromButton : currentIndexFromStorage)
                  ? "current-movie-frame"
                  : "")
              }>
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

ImagesContainer.propTypes = {
  buttonLogic: PropTypes.bool,
  setButtonLogic: PropTypes.func,
  currentIndexFromButton: PropTypes.number,
  currentIndexFromStorage: PropTypes.number,
  setCurrentIndexFromButton: PropTypes.func,
  gameStatus: PropTypes.string,
  dayCount: PropTypes.number
};

export default ImagesContainer;
