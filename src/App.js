import React from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { loremIpsum, username } from 'react-lorem-ipsum';
import './App.css';

export default function App() {
    const [insights, setInsights] = React.useState([]);
    const cache = React.useRef(new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 150,
    }));

    React.useEffect(() => {
        setInsights(
            [...Array(100).keys()].map(key => {
                return {
                    id: key,
                    title: username(),
                    content: loremIpsum({ p:1, startWithLoremIpsum:false, random:true})
                }
            })
        )
    }, []);

    return (
        <div className="appBody">
            <div className="appAccounts"><h1>Accounts</h1></div>
            <div className="appContent">
                <div>&nbsp;</div>
                <div className="insights" style={{ width:"100%", height: "100vh"}}>
                   <AutoSizer>
                       {({width, height}) => (
                           <List 
                            width={width}
                            height={height} 
                            rowHeight={cache.current.rowHeight}
                            deferredMeasurementCache={cache.current} 
                            rowCount={insights.length}
                            rowRenderer={({ key, index, style, parent}) => {
                               const insight = insights[index];

                               return (
                                <CellMeasurer 
                                key={key}
                                cache={cache.current}
                                parent={parent} columnIndex={0}
                                rowIndex={index}>
                                   <div key={key} className="insight" style={style}>
                                       <div className="insightTitle">{insight.title}</div>
                                       <div className="insightContent">{insight.content}</div>
                                   </div>
                                </CellMeasurer>
                                )
                            }}
                            />
                        )}
                        
                   </AutoSizer>
                </div>
                <div>&nbsp;</div>
            </div>
            <div className="appOptions"><h1>Options</h1></div>
        </div>
    )
}
