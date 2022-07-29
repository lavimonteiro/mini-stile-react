import React from "react";

class Cards extends React.Component {
  render() {
    let data = this.props.data;
    let dataArr = [];

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        dataArr.push(
          <div>
            <RenderCards
              title={data[i].lesson_title}
              image={data[i].image}
              alt_text={data[i].alt_text}
              text_content={data[i].text_content}
              classification={data[i].classification}
              url={data[i].url}
            />
          </div>
        );
      }
      return dataArr;
    }
  }
}

class RenderCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropDownMenu: false,
    };
  }

  toggleButtonClicked() {
    if (this.state.isDropDownMenu) {
      this.setState({ isDropDownMenu: false });
    } else {
      this.setState({ isDropDownMenu: true });
    }
  }

  lessonButtonClicked() {
    if (sessionStorage.length >= 1) {
      localStorage.setItem("lesson", this.props.url);
      location.assign("/lesson");
    } else {
      window.location.href = "/profile";
    }
  }

  render() {
    return (
      <div className="lesson">
        <button
          type="button"
          className="icon"
          onClick={() => this.toggleButtonClicked()}
        >
          <div className="card">
            <img src={this.props.image} alt={this.props.alt_text} id="img" />
          </div>
        </button>
        {this.state.isDropDownMenu ? (
          <div className="content">
            <ol>
              <li className="noListDeco">
                <p>{this.props.text_content}</p>
              </li>
              <li className="noListDeco">
                <div id="classification">
                  <p>{this.props.classification}</p>
                </div>
              </li>
            </ol>
            <button
              className="goToLesson"
              onClick={() => this.lessonButtonClicked()}
            >
              go to lesson
            </button>
          </div>
        ) : (
          <div className="overlay">{this.props.title}</div>
        )}
      </div>
    );
  }
}

function buildSearchWords(data) {
  let lessonData = data;
  for (const lesson of lessonData) {
    lesson.searchWords = new Set(
      lesson.text_content
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .split(" ")
    );
  }
}
/**
 *
 * @param {Object} card
 * @param {Object[]} cardArray
 * @returns {number}
 */

function countCardInArray(card, cardArray) {
  let numMatches = 0;

  for (const item of cardArray) {
    if (item === card) {
      numMatches += 1;
    }
  }
  return numMatches;
}

function rankedCards(cardArray) {
  let sortedCards = [];
  let frequencyOfCards = [];
  let unique = new Set(cardArray);
  for (const lesson of unique) {
    frequencyOfCards.push({
      card: lesson,
      frequency: countCardInArray(lesson, cardArray),
    });

    frequencyOfCards.sort(function (a, b) {
      return b.frequency - a.frequency;
    });
  }

  for (const lessonCard of frequencyOfCards) {
    sortedCards.push(lessonCard.card);
  }

  return sortedCards;
}

function getMatchesInData(word, data) {
  let value = word.trim().split(" ");
  var matchedCards = [];

  for (const lesson of data) {
    for (const word of lesson.searchWords) {
      for (const match of value) {
        if (word.includes(match)) {
          matchedCards.push(lesson);
        }
      }
    }
  }
  return matchedCards;
}

export class LessonCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      userNoSearch: true,
      searchQuery: null,
    };

    this.getApiData();
  }

  getApiData() {
    fetch("/api/v1/library/cards")
      .then((response) => response.json())
      .then((data) => {
        buildSearchWords(data);
        this.setState({ apiResponse: data });
      });
  }

  SearchBar() {
    const value = this.state.searchQuery;
    let lessonData = this.state.apiResponse;

    if (!value) {
      return [];
    }

    let matchedCards = getMatchesInData(value, lessonData);
    let ranked = rankedCards(matchedCards);
    return ranked;
  }

  render() {
    const cards = this.SearchBar();
    return (
      <div>
        <div class="newHeading">
          <div class="heading">
            <h1>Stile Lessons</h1>
          </div>
          <div class="search-bar">
            <input
              id="mySearch"
              type="text"
              placeholder="Search..."
              name="search"
              onChange={(event) =>
                this.setState({ searchQuery: event.target.value })
              }
            />
          </div>
        </div>
        <div className="data">
          {!this.state.searchQuery ? (
            <Cards data={this.state.apiResponse} />
          ) : (
            <Cards data={cards} />
          )}
        </div>
        {cards.length <= 0 && this.state.searchQuery ? (
          <div className="noMatch">
            <p>No lessons found</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
