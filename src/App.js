import * as React from "react";
import { type ScrollIndices } from "./types";
import { loremIpsum, username } from "react-lorem-ipsum";
import "./App.css";
import { GroupedVirtuoso, Virtuoso } from "react-virtuoso";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  ArrowKeyStepper,
} from "react-virtualized";
import Insight from "./components/Insight";
import { useHotkeys } from "react-hotkeys-hook";
import Hotkeys from "react-hot-keys";
import { func } from "prop-types";
import { traverseTwoPhase } from "react-dom/test-utils";

export default function App() {
  const [backInsights, setInsights] = React.useState([]);
  const [insights, setVisInsights] = React.useState([]);
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 120,
    })
  );
  const [align, setAlign] = React.useState("center");
  const [keyStepper, setKeyStepper] = React.useState({
    mode: "cells",
    isClickable: true,
    scrollToColumn: 0,
    scrollToRow: 0,
  });
  const [behavior, setBehavior] = React.useState("auto");
  const [currentScrollIndex, setCurrentScrollIndex] = React.useState(0);
  const [keyCount, setKeyCount] = React.useState(0);
  const keywordsRef = React.useRef(null);
  const groups = ["Key", "Personal", "Financing", "Who knows"];
  const keywords = ["debit", "ceo", "donations", "fundraising"];
  const [checkedItems, setCheckedItems] = React.useState({
    debit: true,
    ceo: false,
    donations: false,
    fundraising: false,
  });

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
    setCurrentScrollIndex(0);
  };

  // const handler = React.useCallback(
  //   ({insights}) => {
  //     console.log(insights)
  //   },
  //   [insights]
  // );

  // React.useEventListener('keyDown', handler);

  function getKeyword() {
    let i = Math.random() * 100;
    if (i < 25) {
      return "debit";
    } else if (i > 25 && i < 50) {
      return "ceo";
    }
    if (i > 50 && i < 75) {
      return "donations";
    } else {
      return "fundraising";
    }
  }

  function getGroup() {
    let i = Math.random() * 100;
    if (i < 25) {
      return "Key";
    } else if (i > 25 && i < 50) {
      return "Personal";
    }
    if (i > 50 && i < 75) {
      return "Financing";
    } else {
      return "Who knows";
    }
  }

  React.useEffect(() => {
    setInsights(
      [...Array(100).keys()]
        .map((key) => {
          return {
            id: key,
            title: username(),
            content: loremIpsum({
              p: 2,
              startWithLoremIpsum: false,
              random: true,
            }),
            //TODO: Add more groups
            group: getGroup(),
            keyword: getKeyword(),
            status: 0,
          };
        })
        .sort((a, b) => a.keyword.localeCompare(b.keyword))
        .sort((a, b) => a.group.localeCompare(b.group))
    );
  }, []);

  React.useEffect(() => {
    setVisInsights([...backInsights].filter((x) => checkedItems[x.keyword]));
  }, [checkedItems]);

  // TODO: Probably prettier ways of doing this
  let insightsToRender = [];

  groups.forEach((groupName) => {
    insightsToRender.push(groupName);    
    Array.prototype.push.apply(insightsToRender, insights
        .filter((insight) => insight.group === groupName)
        .filter((insight) => insight.keyword !== "ceo"));
  });

  return (
    <div className="appBody">
      <div className="appAccounts">
        <h1>Accounts</h1>
      </div>
      <div className="appContent">
        <div>&nbsp;</div>
        {console.log(insightsToRender)}
        <Virtuoso
          data={insightsToRender}
          totalCount={insightsToRender.length}
          itemContent={(index) => {
            if(typeof insightsToRender[index] === "string") {
              return (
                <div id={insightsToRender[index]}>
                  <h2>{insightsToRender[index]}</h2>
                </div>
              )
            }

            return (
              <Insight
                key={insightsToRender[index]?.id}
                status={insightsToRender[index]?.status}
                keyword={insightsToRender[index]?.keyword}
                title={insightsToRender[index]?.title}
                content={insightsToRender[index]?.content}
              />
            );
          }}
        />
        <div>&nbsp;</div>
      </div>
      <div className="appOptions">
        <h1>Options</h1>
        <div className="appOptionsGroups">
          <h1>Groups</h1>
          {groups.map((value, index) => {
            return <h3 key={index}>{value}</h3>;
          })}
        </div>
        <div className="appOptionsKeywords">
          <ul>
            {keywords.map((value, index) => {
              return (
                <li ref={keywordsRef} className="keyword">
                  <input
                    type="checkbox"
                    name={value}
                    onChange={handleChange}
                    checked={checkedItems[value]}
                  />
                  <div>{value}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

{
  /* <Insight
                        key={insights[index]?.id}
                        style={style}
                        status={insights[index]?.status}
                        keyword={insights[index]?.keyword}
                        title={insights[index]?.title}
                        content={insights[index]?.content}
                      /> */
}
