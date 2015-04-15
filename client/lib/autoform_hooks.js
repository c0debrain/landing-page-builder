AutoForm.hooks({
	editContent: {
		onSuccess: function(updateDoc, result) {
			var newsletterValue = _.uniq(Contents.find({}, {
		    sort: {newsletter: 1}, fields: {newsletter: true}
		  }).fetch().map(function(x) {
		    return x.newsletter;
		  }), true);

			if (newsletterValue[0] === true) {
				Session.set('newsletter', true);
			} else {
				Session.set('newsletter', false);
		  }

			Router.go('home');
			FlashMessages.sendSuccess('Content updated');
		}
  }
});