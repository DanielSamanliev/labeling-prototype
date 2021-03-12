const Insight = (props) => {
  return (
    <div key={props.key} ref={props.ref} className= {props.selected ? "selectedInsight" : "insight"}>
      <div>
        <div className="insightTitle">
          {props.keyword} : {props.title}
        </div>
        <div className="insightContent">{props.content}</div>
      </div>
      <div className="insightOptions">
        <div>&nbsp;</div>
        <svg
          class="cursor-pointer hover:border-green-500 hover:text-green-500 border rounded text-inactive"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
        </svg>
        <svg
          class="cursor-pointer hover:border-red-500 hover:text-red-500 border rounded text-inactive"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Insight;
