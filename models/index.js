'use strict';
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['open', 'closed']
  }
}, {
  getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle;
    }
  }
});

Page.hook('beforeValidate', function(page) {
  if (page.title) {
    page.urlTitle = page.title.replace(/\s/g, '_').replace(/\W/g, '');
  } else {
    page.urlTitle = math.random().toString(36).substring(2, 7);
  }
});

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

module.exports = {
  Page: Page,
  User: User
}
