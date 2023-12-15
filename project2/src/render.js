const render = ({ state, appEl }) => {
  const html = `
        <main>
            ${generateLoaderHtml(state)}
            ${generateLoginHtml(state)}
            ${generateNavHtml(state)}
            <div class="messages-container">
              ${generateUsers(state)}
              ${generateMessages(state)}
              ${generateOutgoing(state)}
            </div>
        </main>
    `;
  appEl.innerHTML = html;

  function generateStatusHtml(state) {
    return `
        <div class="status">${state.error}</div>
    `;
  }

  function generateLoaderHtml(state) {
    if (state.isMessagePending || state.isUsersPending || state.isLoginPending) {
      return `
      div class="login__waiting">Loading user...</div>
    `;
    } else {
      return ``;
    }
  }

  function generateLoginHtml(state) {
    if (state.isLoggedIn) {
      return ``;
    }
    return `
      <div class="login">
          <h1 class="login-title">Login Here!</h2>
          <form class="login-form" method="POST">
              <div class="input-field">
                <input type="text" class="username" name="username" placeholder=" Type your username here!" />
              </div>
              <button type="submit" class="login-btn">Login</button>
          </form>
          ${generateStatusHtml(state)}
      </div>
    `;
  }

  function generateNavHtml(state) {
    if (state.isLoggedIn && !state.isMessagePending && !state.isUsersPending) {
      return `
      <nav class="user-navbar">
      <ul>
        <li>
          <div class="user-details">
            <span class="user-avatar">${state.username
              .charAt(0)
              .toUpperCase()}</span>
            <span class="user-name">${
              state.username.charAt(0).toUpperCase() + state.username.slice(1)
            }</span>
          </div>
        </li>
        <li>
          <form method="POST" action="./logout">
            <button class="logout-btn" type="submit">Logout</button>
          </form>
        </li>
      </ul>
    </nav>`;
    } else {
      return ``;
    }
  }

  function generateMessages(state) {
    if (state.isLoggedIn && !state.isMessagePending && !state.isUsersPending) {
      if (Object.values(state.messages).length > 0) {
        return (
          `
              <ol class="messages">` +
          Object.values(state.messages)
            .map(
              (message) => `
              <li>
                <div class="message">
                  <span class="sender-avatar">${message.username.charAt(
                    0
                  )}</span>
                  <div class="message-content">
                    <p class="message-sender">${message.username}</p>
                    <p class="message-text">${message.message}</p>
                  </div>
                </div>
              </li>
              `
            )
            .join("") +
          `</ol>
            `
        );
      } else {
        return `
          <div class="no-messages"><h2>No Messages Here</h2></div>
        `;
      }
    } else {
      return ``;
    }
  }

  function generateOutgoing(state) {
    if (state.isLoggedIn ) {
      return `
        <div class="send-bottom">
            <form class="chat-send-form">
              <input type="text" class="to-send" name="message" placeholder="Type your message"/>
              <button type="submit" class="send-btn">Send</button>
            </form>
        </div>
        `;
    } else {
      return ``;
    }
  }

  function generateUsers(state) {
    if (state.isLoggedIn && !state.isUsersPending) {
      return (
        `<div class="users-list">
          <h3>All Users:</h3>
          <ul class="users">` +
          Object.values(state.users)
          .map(
            (user) => `
                  <li>
                    <div class="user ${user.online ? "active" : ""}">
                      <span class="sender">${user.username}</span>
                    </div>
                  </li>
                `
          )
          .join("") +
        `</ul>
        </div>`
      );
    } else {
      return ``;
    }
  }
};

export default render;
