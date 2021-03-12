import * as React from "react";
import { loremIpsum, username } from "react-lorem-ipsum";
import "./App.css";
import { GroupedVirtuoso } from "react-virtuoso";
import Insight from "./components/Insight";
import react from "react";
import * as Hotkeys from "react-hotkeys-hook"
import reactDom from "react-dom";

export default function App() {
  const [backInsights, setInsights] = React.useState([]);
  const [insights, setVisInsights] = React.useState([]);
  const [checkedItems, setCheckedItems] = React.useState({});
  const [align, setAlign] = React.useState("start");
  const [behavior, setBehavior] = React.useState("auto");
  const [count, setCount] = React.useState(0);
  const virtuoso = React.useRef(null);
  const keywordsRef = React.useRef(null);

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });    
  };

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
      return "Group3";
    } else {
      return "Group4";
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
              p: 1,
              startWithLoremIpsum: false,
              random: true,
            }),
            //TODO: Add more groups
            group: getGroup(),
            keyword: getKeyword(),
          };
        })
        .sort((a, b) => a.keyword.localeCompare(b.keyword))
        .sort((a, b) => a.group.localeCompare(b.group))
    );
  }, []);

  React.useEffect(() => {
    setVisInsights(
      [...backInsights]
        .filter(x => checkedItems[x.keyword])
    );
  }, [checkedItems]);

  Hotkeys.useHotkeys('Escape', () => "I work");

  


  // TODO: Probably prettier ways of doing this
  const groups = ["Key", "Personal", "Group3", "Group4"];
  const keywords = ["debit", "ceo", "donations", "fundraising"];
  let groupCounts = [];

  groups.forEach((groupName) => {
    groupCounts.push(
      insights.reduce(
        (counter, { group }) =>
          groupName.localeCompare(group) === 0 ? (counter += 1) : counter,
        0
      )
    );
  });

  return (
    <div className="appBody">
      {console.log(checkedItems)}
      {console.log(insights)}
      <div className="appAccounts">
        <h1>Accounts</h1>
      </div>
      <div className="appContent">
        <div>&nbsp;</div>
        <div className="insights" style={{ width: "100%", height: "100vh" }}>          
          <GroupedVirtuoso
            ref={virtuoso}
            groupCounts={groupCounts}
            groupContent={(index) => {
              return (
                <div
                  style={{
                    backgroundColor: "white",
                    fontSize: "30px",
                    marginBottom: "10px",
                  }}
                >
                  {groups[index]}
                </div>
              );
            }}
            itemContent={(index) => {
              return (
                <Insight
                  selected={index === count}
                  key={insights[index]?.id}
                  keyword={insights[index]?.keyword}
                  group={insights[index]?.group}
                  title={insights[index]?.title}
                  content={insights[index]?.content}
                />
              );
            }}
          />
        </div>
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
        <div>
          <button
            onClick={() => {
              console.log(virtuoso);
              return false;
            }}
          >
            Go to 1
          </button>
          {/* <button
            onClick={() => {
              keywordsRef.current.checked = false;
              keywordsRef.
            }}
          >
            Next
          </button> */}
        </div>
        <div className="appOptionsKeywords">
          <ul>
            {keywords.map((value, index) => {
              return (
                <li ref={keywordsRef} className="keyword">
                  <input type="checkbox" name={value} onChange={handleChange} checked={checkedItems[value]} />
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
