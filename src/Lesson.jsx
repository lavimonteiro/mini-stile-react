import React from "react";
import "./css/Lesson.css";
import bowtie from "./images/bowtie.png";

class LessonContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
    };
  }
  onBaseClick(e) {
    if (e.pageY !== this.state.top || e.pageX !== this.state.left)
      this.setState({
        top: e.pageY,
        left: e.pageX,
      });
  }
  render() {
    if (this.props.apiResponse !== null) {
      return (
        <>
          <h1 id="lesson-title">{this.props.apiResponse.lesson_title}</h1>
          <p id="text-content">{this.props.apiResponse.text_content}</p>
          <OnTopPic
            apiResponse={this.props.apiResponse}
            top={this.state.top}
            left={this.state.left}
            // ref={this.componentRef}
          />
          <div id="baseImg">
            <img
              onClick={(e) => {
                this.onBaseClick(e);
              }}
              id="base-pic"
              src={this.props.apiResponse.base_url}
              alt={this.props.apiResponse.base_alt}
            />
          </div>
        </>
      );
    }
  }
}

class OnTopPic extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      width: 0,
      height: 0,
    };
  }
  render() {
    // local images wouldn't load from the link in the database
    let imgSrc;
    if (this.props.apiResponse.on_top_url === "images/bowtie.png") {
      imgSrc = bowtie;
    } else {
      imgSrc = this.props.apiResponse.on_top_url;
    }

    return (
      <img
        ref={this.inputRef}
        style={{
          top: this.props.top - this.state.height / 3,
          left: this.props.left - this.state.width / 2,
        }}
        id="on-top-pic"
        src={imgSrc}
        alt={this.props.apiResponse.on_top_alt}
      />
    );
  }
  componentDidUpdate() {
    if (
      this.state.width !== this.inputRef.current.clientWidth ||
      this.state.height !== this.inputRef.current.clientHeight
    ) {
      this.setState({
        width: this.inputRef.current.clientWidth,
        height: this.inputRef.current.clientHeight,
      });
    }
  }
}

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
    };
    this.getApiData();
  }
  getApiData() {
    fetch("/api/v1/library/lesson/" + localStorage.getItem("lesson"))
      .then((response) => response.json())
      .then((data) => {
        this.setState({ apiResponse: data });
      });
  }
  render() {
    return (
      <div className="react">
        <LessonContent apiResponse={this.state.apiResponse} />;
      </div>
    );
  }
}

export default Lesson;
