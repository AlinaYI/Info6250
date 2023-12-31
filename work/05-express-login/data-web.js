const dataWeb = {
    indexPage: function (data, userData) {
      return `
          <!doctype html>
          <html>
            <head>
              <title>User Application</title>
              <link rel="stylesheet" href="./css/styles.css"/>
              <link rel="stylesheet" href="./css/form.css"/>
              <link rel="stylesheet" href="./css/unauthorized.css"/>
            </head>
            <body>
              <div id="user-app">
                  ${!userData ? dataWeb.getLogin() : dataWeb.getData(userData)}
              </div>
            </body>
          </html>
          `;
    },

    getLogin: function () {
      return `
          <div class="login-form">
              <h1 class="login-title">Login Here!</h1>
              <form method="POST" action="./login">
                  <div class="input-field">
                      <input type="text" class="username" name="username" placeholder=" Type your username here!" />
                  </div>
                  <button type="submit" class="login-btn">Login</button>
              </form>
          </div>
      `;
    },

    getData: function (userData) {
      return `
      <nav class="user-navbar">
        <ul>
          <li>
            <div class="user-details">
              <span class="user-avatar">${userData.username
                .charAt(0)
                .toUpperCase()
                }</span>
              <span class="user-name">${
                userData.username.charAt(0).toUpperCase()+userData.username.slice(1)
              }</span>
            </div>
          </li>
          <li>
            <form method="POST" action="./logout">
              <button class="logout-btn" type="submit">Logout</button>
            </form>
          </li>
        </ul>
      </nav>

      <div class="user-message">
        <p><span class="message-label">Message</span><span class="message-content">${
          !userData.message
            ? "No message"
            : `${userData.message}`
        }</span></p>
      </div>
      <div class="update-form">
          <h1 class="update-title">Update Message</h1>
          <form method="POST" action="./message">
              <div class="input-field">
                  <input type="text" class="message" name="message" placeholder=" Type message Here! " />
              </div>
              <button type="submit" class="update-msg-btn">Update</button>
          </form>
      </div>
    `;
    },
    getError: function () {
      return `
      <!doctype html>
      <html>
        <head>
          <title>401 Unauthorized</title>
          <link rel="stylesheet" href="./css/styles.css"/>
          <link rel="stylesheet" href="./css/unauthorized.css"/>
        </head>
        <body>
          <div id="unauthorized-page">
              <h1 class="error-title">Unauthorized User</h1>
              <p class="error-description">The user is not authorized to Login. </p>
              <p Please try again. </p>
              <a href="/" class="home-link">Return Home</a>
          </div>
        </body>
      </html>
      `;
    },
  };
  
  module.exports = dataWeb;