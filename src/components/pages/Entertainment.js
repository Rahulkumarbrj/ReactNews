import React from "react";
import NewsList from "../NewsList";

export default function Entertainment(props) {
  return (
    <div>
      <NewsList
        chaneProgress={props.chaneProgress}
        dataLimit={20}
        country="us"
        category="entertainment"
      />
    </div>
  );
}
