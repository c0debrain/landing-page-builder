function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
  }
}

Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }

  if (Contents.find().count() === 0) {
    var now = Date.now(),
        admin = Meteor.users.findOne();

    Contents.insert({
      title: 'Cool Cat',
      subtitle: 'A short story about my cat.',
      heroTitle: 'This is my favorite cat.',
      heroContent: 'His name is Mittens. This cat does a lot of dumb shit but I still love him.',
      heroImage: 'http://placekitten.com/220/300',
      newsletter: 'on',
      overlay: '',
      mailchimpAPI: 'xxxxxxxxxxxxxxxxxxxxxxx-xxx',
      mailchimpID: 'xxxxxxxxxx',
      content: '##The story begins!\n\nHe lived, he scratched up my furniture. He ate for free and always hated when I tried to pet him. Scratched me a bunch of times. Then he grew old and died. He was the best cat ever. The end.',
      created: now,
      updated: now,
      author: admin.username,
      contentCall: function() {
        return this.content;
      }
    });
  }
});
