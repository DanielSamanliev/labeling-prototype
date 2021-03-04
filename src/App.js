import * as React from "react";
import { loremIpsum, username } from "react-lorem-ipsum";
import "./App.css";
import * as ReactDOM from "react-dom";
import { GroupedVirtuoso } from "react-virtuoso";
import Insight from "./components/Insight";

export default function App() {
  const [insights, setInsights] = React.useState([]);

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
            group: Math.random() * 100 > 50 ? "Key" : "Personal",
          };
        })
        .sort((a, b) => a.group.localeCompare(b.group))
    );
  }, []);

  // TODO: Probably prettier ways of doing this
  const groups = ["Key", "Personal"];
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
      </div>
      <div className="appContent">
        {console.log(groupCounts)}
        <div>&nbsp;</div>
        <div className="insights" style={{ width: "100%", height: "100vh" }}>
          <GroupedVirtuoso
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
                  key={insights[index].id}
                  group={insights[index].group}
                  title={insights[index].title}
                  content={insights[index].content}
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
      </div>
    </div>
  );
}
