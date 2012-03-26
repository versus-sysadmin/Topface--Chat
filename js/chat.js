/*
	Class for Chat interface
	Author Alexander Bezrukov aka versus <god@goan.ru>
*/

var chat = function(){
	var jUsersListContainer = null;
	var jCollocutorContainer = null;
	var jMessagesListContainer = null;
	var jChatContainer = null;
	var jSendBoxContainer = null;
	var currentCollocutor = null;
	var jMainWrapper = null;
	
	function initContainers() {
		jUsersListContainer = jQuery('.list.users.container');
		jUsersListContainer.empty();
		
		jCollocutorContainer = jQuery('.collocutor.container');
		
		jMessagesListContainer = jQuery('.list.messages.container');
		jMessagesListContainer.empty();
		
		jChatContainer = jQuery('.chat-box.container');
		
		jSendBoxContainer = jQuery('.send-message-box.container');
		initSendBoxActions();
		
		jMainWrapper = jQuery('.chat-wrapper');
		
		clearChat();
	};
	
	function initSendBoxActions() {
		jSendBoxContainer.find('.action.send').click(function(){
			sendMessageAction();
			return false;
		});
		
		jSendBoxContainer.find('.action.show-rates').click(function(){
			showRatesAction();
			return false;
		});
		
		jSendBoxContainer.find('.action.show-gifts').click(function(){
			showGiftsAction();
			return false;
		});
	};
	
	function initUserItemActions(jUserItem) {
		jUserItem.find('.action.delete').click(function() {
			deleteUserAction(jQuery(this));
			return false;
		});
		
		jUserItem.click(function() {
			changeCollocutorAction(jQuery(this));
			return false;
		});
	};
	
	function initMessageActions(jMessageItem) {
		jMessageItem.find('.action.delete').click(function(){
			deleteMessageAction(jQuery(this));
		});
		
		jMessageItem.find('.action.show-rates').click(function(){
			showRatesAction();
			return false;
		});
		
		jMessageItem.find('.action.show-gifts').click(function(){
			showGiftsAction();
			return false;
		});
	};
	
	
	function initTipBoxActions(jTipBox) {
		jTipBox.find('.action.first-message-change').click(function(){
			firstMessageChangeAction(jQuery(this));
			return false;
		});
		
		jTipBox.find('.action.set-message').click(function(){
			jSendBoxContainer.find('textarea[name="message"]').text(jQuery(this).find('span').text());
			return false;
		});
	};
	
	function initDeleteDialogActions(jDialogItem) {
		jDialogItem.find('.action.cancel, .action.close').click(function(){
			closeDialogBox(jQuery(this));
			return false;
		});
		
		jDialogItem.find('.action.delete').click(function() {
			var jDialogBoxItem = jQuery(this).parents('.dialog-box');
			var sId = jDialogBoxItem.attr('id').substring(4);
			closeDialogBox(jQuery(this));
			deleteMessage(sId);
			return false;
		});
	};
	
	function initRatingDialogActions(jDialogItem) {
		jDialogItem.find('.action.cancel, .action.close').click(function(){
			closeDialogBox(jQuery(this));
			return false;
		});
		
		jDialogItem.find('.action.send-rating').click(function() {
			closeDialogBox(jQuery(this));
			sendRating(jQuery(this));
			return false;
		});
	};
	
	function initGiftsActions(jGiftsBoxItem) {
		jGiftsBoxItem.find('.action.cancel, .action.close').click(function(){
			closeGiftsBox(jQuery(this));
			return false;
		});
	};
	
	function deleteMessageAction(jTrigger) {
		var jMessageItem = jTrigger.parents('.item');
		var sId = jMessageItem.attr('id').substring(8);
		var message = {
			'id': jMessageItem.attr('id').substring(8),
			'text': jMessageItem.find('.text').html()
		};
		
		showDeleteDialog(message);
	}
	
	function deleteUserAction(jTrigger) {
		var jUserItem = jTrigger.parentsUntil(jUsersListContainer, '.item');
		var sId = jUserItem.attr('id').substring(5);
		server.fakeGetJSON('deleteUser', {id: sId}, function(data) {
			if(data.success == true) {
				jUserItem.remove();
			}
		});
	};
	
	function changeCollocutorAction(jUserItem) {
		clearChat();
		sId = jUserItem.attr('id').substring(5);
		server.fakeGetJSON('user', {'id': sId}, function(user) {
			prepareCollocutor(user);
			jUsersListContainer.find('.item.active').removeClass('active');
			jUserItem.addClass('active');
		});
		
		server.fakeGetJSON('messages', {collocutorId: sId}, function(messages) {
			prepareMessagesList(messages);
		});
	};
	
	function firstMessageChangeAction(jTrigger) {
		server.fakeGetJSON('firstMessageTip', null, function(tip) {
			jTrigger.parents('.first-message').find('.first-message-text span').html(tip.message);
		});
	};
	
	function sendMessageAction() {
		jChatContainer.removeClass('empty');
		removeModalBoxes();
		var sMessage = jSendBoxContainer.find('textarea[name="message"]').text();
		var iTo = currentCollocutor.id;
		
		server.fakeGetJSON('sendMessage', {'to': iTo, 'message': sMessage }, function(message) {
			addMessage(message);
		});
	};
	
	function showGiftsAction() {
		server.fakeGetJSON('getGifts', null, function(gifts) {
			jGiftsItem = templator.getGiftsItem(gifts);
			initGiftsActions(jGiftsItem);
			jMainWrapper.append(jGiftsItem);
		});
	};
	
	function showRatesAction() {
		jDialogItem = templator.getRatingDialogItem(currentCollocutor);
		initRatingDialogActions(jDialogItem);
		jChatContainer.prepend(jDialogItem);
	};
	
	function showDeleteDialog(message) {
		jDialogItem = templator.getDeleteDialogItem(message);
		initDeleteDialogActions(jDialogItem);
		jChatContainer.prepend(jDialogItem);
	};
	
	function addMessage(message) {
		var jMessageItem = templator.getMessageItem(message);
		if(jMessagesListContainer.children().last().hasClass('user')) {
			var sPrevFrom = 'user';
		} else {
			var sPrevFrom = 'collocutor';
		}
		
		if(sPrevFrom == message.fromType) {
			jMessageItem.find('.name').addClass('invisible');
		}
		
		initMessageActions(jMessageItem);
		jMessagesListContainer.append(jMessageItem);
		jMessagesListContainer.scrollTop(jMessagesListContainer[0].scrollHeight);
	};
	
	function deleteMessage(sId) {
		server.fakeGetJSON('deleteMessage', {'id': sId}, function(data) {
			if(data.success == true) {
				jQuery('#message_' + sId).addClass('deleted').find('.text').html(data.message);
			}
		});
	};
	
	function sendRating(jTrigger) {
		server.fakeGetJSON('sendRating', {'id': currentCollocutor.id}, function(message) {
			addMessage(message);
		});
	};
	
	function closeDialogBox(jTrigger) {
		jTrigger.parents('.dialog-box-wrapper').remove();
	};
	
	function closeGiftsBox(jTrigger) {
		jTrigger.parents('.gifts-box').remove();
	};
	
	function prepareCollocutor(user) {
		currentCollocutor = user;
		
		var jCollocutorItem = templator.getCollocutor(currentCollocutor);
		jCollocutorContainer.empty().append(jCollocutorItem);
	};
	
	function prepareMessagesList(messages) {
		jMessagesListContainer.empty();
		if(messages) {
			jChatContainer.removeClass('empty');
			var sPrevFrom = '';
			for(var i=0; i < messages.length; i++) {
				var jMessageItem = templator.getMessageItem(messages[i]);
				if(sPrevFrom == messages[i].fromType) {
					jMessageItem.find('.name').addClass('invisible');
				} else {
					sPrevFrom = messages[i].fromType;
				}
				initMessageActions(jMessageItem);
				jMessagesListContainer.append(jMessageItem);
			}
		} else {
			jChatContainer.addClass('empty');
			showTip('firstMessage');
		}
	};
	
	function prepareUsers() {
		jUsersListContainer.addClass('loading');
		
		server.fakeGetJSON('users', null, function(users) {
			for(var i = 0; i < users.length; i++) {
				var jUserItem = templator.getUserItem(users[i]);
				initUserItemActions(jUserItem);
				if(users[i].active == 'active') {
					changeCollocutorAction(jUserItem);
				}
				jUsersListContainer.append(jUserItem);
			}
		});
		
		jUsersListContainer.removeClass('loading');
	};
	
	
	function showTip(sType) {
		switch(sType) {
			case 'firstMessage':
				showFirstMessageTip();
		}
	};
	
	function showFirstMessageTip() {
		server.fakeGetJSON('firstMessageTip', null, function(tip) {
			var jTipBox = templator.getFirstMessageItem(tip);
			initTipBoxActions(jTipBox);
			jChatContainer.append(jTipBox);
		});
	};
	
	function clearChat() {
		jMessagesListContainer.empty();
		removeModalBoxes();
	};
	
	function removeModalBoxes() {
		jChatContainer.children().not(jMessagesListContainer).not(jSendBoxContainer).remove();
	}
	
	
	return {
		init: function() {
			initContainers();
			prepareUsers();
		}
	};
}();