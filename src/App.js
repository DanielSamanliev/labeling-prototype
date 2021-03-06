import * as React from "react";
import { loremIpsum, username } from "react-lorem-ipsum";
import "./App.css";
import { GroupedVirtuoso, Virtuoso } from "react-virtuoso";
import Insight from "./components/Insight";
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkeys from 'react-hot-keys'
import { func } from "prop-types";

export default function App() {
  const [backInsights, setInsights] = React.useState([]);
  const [insights, setVisInsights] = React.useState([]);
  const [checkedItems, setCheckedItems] = React.useState({ "debit" : true, "ceo" : false, "donations": false, "fundraising": false });
  const [align, setAlign] = React.useState("center");
  const [behavior, setBehavior] = React.useState("auto");
  const [count, setCount] = React.useState(0);
  const [keyCount, setKeyCount] = React.useState(0);
  const virtuoso = React.useRef(null);
  const keywordsRef = React.useRef(null);
  const groups = ["Key", "Personal", "Financing", "Who knows"];
  const keywords = ["debit", "ceo", "donations", "fundraising"];

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
    setCount(0);
    virtuoso.current.scrollToIndex({
      index: 0,
      align,
      behavior
    })
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
              p: 1,
              startWithLoremIpsum: false,
              random: true,
            }),
            //TODO: Add more groups
            group: getGroup(),
            keyword: getKeyword(),
            isSnippet: true,
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

  function getInsightsCount() {
    return insights.count;
  };

  function moveDown(count, ref, list) {
    ref.current.scrollToIndex({
      index: count + 1,
      align,
      behavior
    });
    //use list[count].id to change in db
    return count < list.length - 1 ? count + 1 : count; 
  }

  function moveUp(count, ref) {
    ref.current.scrollToIndex({
      index: count - 1,
      align,
      behavior
    });
    //use list[count].id to change in db
    return count > 0 ? count - 1 : count;
  }

  function prevKeyword(count, checkedItems, keywords) {
    if(count > 0) {
      setCheckedItems({
        ...checkedItems,
        [keywords[count]]: false,
        [keywords[count - 1]]: true
      });
      return count - 1;
    }
    return count;
  }

  function nextKeyword(count, checkedItems, keywords) {
    if(count < keywords.length - 1) {
      setCheckedItems({
        ...checkedItems,
        [keywords[count]]: false,
        [keywords[count + 1]]: true
      });
      return count + 1;
    }
    return count;
  }

  useHotkeys('s', () =>
    setCount(prevCount => moveDown(prevCount, virtuoso, insights)),
    {},
    [insights]
  );

  useHotkeys('w', () =>
    setCount(prevCount => moveUp(prevCount, virtuoso)),
    {},
    [insights]
  );

  useHotkeys("a", () =>
    setKeyCount(prevCount => prevKeyword(prevCount, checkedItems, keywords)),
    {},
    [checkedItems, keywords]
  )

  useHotkeys("d", () => 
    setKeyCount(prevCount => nextKeyword(prevCount, checkedItems, keywords)),
    {},
    [checkedItems, keywords]
  )

  // TODO: Probably prettier ways of doing this
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
      <div className="appAccounts">
        <h1>Accounts</h1>
        {console.log(checkedItems)}
      </div>
      <div className="appContent">
        <div>&nbsp;</div>
        <div className="insights" style={{ width: "100%", height: "100vh" }}>
          {/* <Virtuoso
            data= {insights}
            totalCount = {insights.count}            
            itemContent= {(index) => {
              return (
                <Insight
                  selected={index === count}
                  isSnippet={insights[index]?.isSnippet}
                  group={insights[index]?.group}
                  key={insights[index]?.id}
                  keyword={insights[index]?.keyword}
                  group={insights[index]?.group}
                  title={insights[index]?.title}
                  content={insights[index]?.content}
                />
              )
            }}
          /> */}
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
