import React from "react";
import { Link, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import { deleteApiData } from "../actions/inbox.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Mail from "../components/Mail.js";
import { requestInboxData } from "../actions/inboxMail.js";
import {
  readSentMail,
  deleteSentMail,
  storeSentMail 
} from "../actions/sentMail.js";
import {
  readDraftMail,
  deleteDraftMail,
  storeDraftMail,
  restoreDraftMail 
} from "../actions/draft.js";
import {
  readDeleteMail, 
  storeDeleteMail,
  restoreDeleteMail
} from "../actions/delete.js";

export class MailList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMail: 0,
      mailData: {},
      searchText: "",
      deleteid: 0,
      selectValue: "latest",
      startmail: 0
    };
    this.handleMailClick = this.handleMailClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleMailDelete = this.handleMailDelete.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleOnChange(e) {
    this.setState({ searchText: e.target.value });
    this.setState({ activeMail: 0 });
    this.setState({ startmail: 0 });
  }

  converttime(time) {
    var data = {};
   
    return data;
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
    this.setState({ startmail: 0 });
    this.setState({ activeMail: 0 });
  }

  handleMailDelete(id) {
    this.handleMailClick(id);
    if (this.props.display == "inbox") {
      this.props.deleteApiData(id);
    }
    if (this.props.display == "sent") {
      this.props.deleteSentMail(id);
    } 
    if (this.props.display == "draft") {
      this.props.deleteDraftMail(id);
    }
    if (this.props.display == "trash") {
      this.props.restoreDeleteMail(id);
    }
    this.setState({ deleteid: id });
  }

  handleNextPage() {
    this.setState({ startmail: this.state.startmail });
  }
  handlePrePage() {
   
    this.setState({ startmail: this.state.startmail });
  }
  paginate(mails) {
    var mail_per_page = {};
    mail_per_page.islastPage = false;
   
    if (!mails[this.state.startmail + 6]) {
      
      mail_per_page.islastPage = true;
    }
    mails = mails.slice(this.state.startmail, this.state.startmail);
    mail_per_page.mails = mails;
    
    return mail_per_page;
  }

  moveToDelete(newState, folder) {
    var mailDetails = newState;
    mailDetails.folder = folder;
    mailDetails.folderId = newState.id;
    this.props.storeDeleteMail(mailDetails);
  }

  componentDidMount() {
     this.props.readSentMail();
    this.props.readDraftMail();
    this.props.readDeleteMail();
  }
  handleMailClick(id) {
    var mailData;

    if (this.props.display == "inbox") {
      this.props.requestInboxData(id);

      return this.props.inboxData;
    } else if (this.props.display == "sent") {
      var mail = this.props.sent.data.map(
        function(mail) {
          if (mail.id === id) {
            this.setState({ mailData: mail });
          }
          return mail;
        }.bind(this)
      );
    } else if (this.props.display == "draft") {
      var mail = this.props.draft.data.map(
        function(mail) {
          if (mail.id === id) {
            this.setState({ mailData: mail });
          }
          return mail;
        }.bind(this)
      );
    } else if (this.props.display == "trash") {
      var mail = this.props.trash.data.map(
        function(mail) {
          if (mail.id === id) {
            this.setState({ mailData: mail });
          }
          return mail;
        }.bind(this)
      );
    }
  }

  render() {
    //move to trash
    var deleted = false;
    newState = Object.assign({}, this.props.inboxData);
    if (
      this.state.deleteid == newState.id ||
      this.state.deleteid == this.state.mailData.id
    ) {
      if (this.props.display == "inbox") {
        console.log(newState);
        this.moveToDelete(newState, this.props.display);
      } else if (
        this.props.display == "sent" ||
        this.props.display == "draft"
      ) {
        var newState = Object.assign({}, this.state.mailData);
        this.moveToDelete(newState, this.props.display);
      } else if (this.props.display == "trash") {
        var newState = Object.assign({}, this.state.mailData);
        console.log(newState);
        if (newState.folder == "inbox") {
          newState.id = newState.folderId;
          this.props.data.data.push(newState);
          console.log(this.props.data.data);
        } else if (newState.folder == "sent") {
          this.props.storeSentMail(newState);
        } else if (newState.folder == "draft") {
          this.props.restoreDraftMail(newState);
        }
      }
      deleted = true;
    }
    let activeMail = deleted ? 0 : this.state.activeMail;
    let results = [];
    //fetch mail list and mail data
    var data;
    if (this.props.display == "inbox") {
      results = this.props.data.data;
      
      data = this.props.inboxData;
    } else if (this.props.display == "sent") {
      results = this.props.sent.data;
      data = this.state.mailData;
    } else if (this.props.display == "draft") {
      results = this.props.draft.data;
      data = this.state.mailData;
    } else if (this.props.display == "trash") {
      results = this.props.trash.data;
      data = this.state.mailData;
    }

    var mail_list;

    if (results && results.length > 0) {
      //search box filtering
      
      const filteredList = results.filter(
        item =>
          item.subject
            .toLowerCase()
            .includes(this.state.searchText.toLowerCase()) ||
          item.from.toLowerCase().includes(this.state.searchText.toLowerCase())
      );
      //dropdown sorting
      if (this.state.selectValue == "latest") {
        filteredList.sort((a, b) => a.time < b.time);
      } else {
        filteredList.sort((a, b) => a.time > b.time);
      }
      const mail_list_temp = filteredList;
      //rendering list
      var mail_list_per_page = this.paginate(mail_list_temp);
      var is_last = mail_list_per_page.islastPage;
      mail_list = mail_list_per_page.mails.map(
        function(mail) {
          return (
            <a
              className={
                "list-group-item" +
                (this.state.activeMail == mail.id ? " active" : "")
              }
              key={mail.id}
              onClick={() => {
               
              }}
            >
              <i>{this.props.display == "inbox" ? mail.from : mail.to}</i>
              <button
                type="button"
                className={
                  "" +
                  (this.props.display == "trash" ? " restore" : "")
                }
                onClick={() => {
                  this.handleMailDelete(mail.id);
                }}
              >
                {this.props.display == "trash" ? "Restore" : "Delete"}
              </button>

            

              <i className="time pull-right">
                {this.converttime(mail.time).date}
              </i>
            </a>
          );
        }.bind(this)
      );
    }

    if (!mail_list) {
      is_last = true;
    }

    return (
      <div>
        <div className="col-lg-6 col-sm-6 col-xs-6 mail-list-outer">
          <div className="column2 vl">
            <div
              className={
                "search-box" +
                (this.props.display == "inbox" ? "" : " search-visible")
              }
            >
              <form className="search-box">
                <input
                  type="text"
                  placeholder="Search.."
                  autoComplete="off"
                  name="search"
                  
                />
              </form>

              <div className="sort-drop-down">
                <select
                  className="drop-down"
                  
                  value={this.state.selectValue}
                >
                  <option value="latest">Newest on top</option>
                  <option value="old">Oldest on top</option>
                </select>
              </div>
              <br />
            </div>

            <div className="maillist">
              <ul className="list-group">{mail_list}</ul>
              <div className="page-button">
                <button
                  disabled={this.state.startmail ? false : true}
                  className="previous pull-left"
                
                >
                  {" "}
                  ❮ Prev{" "}
                </button>
                <button
                  disabled={is_last}
                  className="next pull-right"
                
                >
                  Next ❯
                </button>
              </div>
            </div>
          </div>
        </div>
        <Mail
          folder={this.props.display}
          inboxData={data}
          mail={activeMail}
          store={this.props.store}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  inboxData: state.inboxMail,
  sent: state.sent,
  draft: state.draft,
  trash: state.trash
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestInboxData,
      readSentMail,
      readDraftMail,
      readDeleteMail,
      deleteApiData,
      storeDeleteMail,
      deleteSentMail,
      deleteDraftMail,
      restoreDeleteMail,
      storeDraftMail,
      restoreDraftMail,
      storeSentMail
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MailList);