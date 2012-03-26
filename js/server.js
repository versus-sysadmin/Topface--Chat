/*
	Class for emulating server's responses
	This functions must be replaced by real
	Author Alexander Bezrukov aka versus <god@goan.ru>
*/

var server = function() {
	var users = new Array(
		{
			'id': 0,
			'name': 'Ренат',
			'age': 21,
			'unreadMessagesCount': 1,
			'avatarUrl': 'images/content/avatars/pic1_m.png',
			'bigAvatarUrl': '',
			'place': 'Россия, Тольяти',
			'status': 'online',
			'profileUrl': '',
			'active': ''
		},{
			'id': 1,
			'name': 'Семён',
			'age': 23,
			'unreadMessagesCount': 10,
			'avatarUrl': 'images/content/avatars/pic2_m.png',
			'bigAvatarUrl': 'images/content/avatars/pic2.png',
			'place': 'Россия, Санкт-Петербург',
			'status': 'online',
			'profileUrl': '',
			'active': 'active'
		},{
			'id': 2,
			'name': 'Сергей',
			'age': 45,
			'unreadMessagesCount': 0,
			'avatarUrl': 'images/content/avatars/pic3_m.png',
			'bigAvatarUrl': '',
			'place': 'Россия, Москва',
			'status': 'online',
			'profileUrl': '',
			'active': ''
		},{
			'id': 3,
			'name': 'Павлик',
			'age': 16,
			'unreadMessagesCount': 0,
			'avatarUrl': 'images/content/avatars/pic4_m.png',
			'bigAvatarUrl': '',
			'place': 'Россия, Санкт-Петербург',
			'status': 'offline',
			'profileUrl': '',
			'active': ''
		},{
			'id': 4,
			'name': 'Алексей',
			'age': 34,
			'unreadMessagesCount': 0,
			'avatarUrl': 'images/content/avatars/pic5_m.png',
			'bigAvatarUrl': '',
			'place': 'Россия, Казань',
			'status': 'offline',
			'profileUrl': '',
			'active': ''
		},{
			'id': 5,
			'name': 'Сергей',
			'age': 24,
			'unreadMessagesCount': 0,
			'avatarUrl': '',
			'bigAvatarUrl': '',
			'place': 'Россия, Санкт-Петербург',
			'status': 'offline',
			'profileUrl': '',
			'active': ''
		}
	);
		
	var messages = [
		[
			{
				'id': 1,
				'type': 'message',
				'fromType': 'collocutor',
				'status': '',
				'from': 'Ренат',
				'time': '11:00',
				'text': 'Добрый день'
			}
		],[
			{
				'id': 2,
				'type': 'message',
				'fromType': 'collocutor',
				'status': '',
				'from': 'Семён',
				'time': '15:37',
				'text': 'привет как дела'
			},{
				'id': 3,
				'type': 'message',
				'fromType': 'user',
				'status': '',
				'from': 'Юлия',
				'time': '15:40',
				'text': 'привет'
			},{
				'id': 4,
				'type': 'message',
				'fromType': 'collocutor',
				'status': '',
				'from': 'Семён',
				'time': '15:41',
				'text': 'хочу познакомиться'
			},{
				'id': 5,
				'type': 'rating',
				'fromType': 'collocutor',
				'status': '',
				'from': 'Семён',
				'time': '15:41',
				'text': ' \
					<img src="images/rating/star_8.png" /> \
					<div class="label align-middle"> \
						Вас оценили. <span class="action show-rates">Оценить в ответ</span> \
					</div> \
					<div class="clear"></div>'
			},{
				'id': 6,
				'type': 'gift',
				'fromType': 'collocutor',
				'status': '',
				'from': 'Семён',
				'time': '15:41',
				'text': '\
					<img src="images/gifts/bag.png" /> \
					<div class="label align-middle"> \
						Вам отправили подарок. <span class="action show-gifts">Отправить подарок в ответ</span> \
					</div> \
					<div class="clear"></div>'
			},{
				'id': 7,
				'type': 'message',
				'fromType': 'user',
				'status': 'deleted',
				'from': 'Юлия',
				'time': '15:43',
				'text': 'Сообщение было удалено'
			},{
				'id': 8,
				'type': 'message',
				'fromType': 'collocutor',
				'status': '',
				'from': 'Семён',
				'time': '15:55',
				'text': 'Я помню чудное мгновение:<br /> \
						Передо мной явилась ты.'
			},{
				'id': 9,
				'type': 'message',
				'fromType': 'user',
				'status': '',
				'from': 'Юлия',
				'time': '15:57',
				'text': 'отличные стихи, Семён'
			},{
				'id': 10,
				'type': 'sympathy',
				'fromType': 'collocutor',
				'status': '',
				'from': 'Семён',
				'time': '16:00',
				'text': '<img src="images/sympathy/heart.png" /> \
						<div class="label align-middle"> \
							Ты понравился. <span class="action sympathy-both">Отправить взаимную симпатию</span> \
						</div> \
						<div class="clear"></div>'
			},{
				'id': 10,
				'type': 'sympathy-both',
				'fromType': 'user',
				'status': '',
				'from': 'Юлия',
				'time': '16:07',
				'text': '<img src="images/sympathy/double_heart.png" /> \
						<div class="label align-middle"> \
							У вас взаимная симатия!<br /> \
							<span class="action show-gifts">Подарок</span> - лучший способ продолжить оношения. \
						</div> \
						<div class="clear"></div>'
			}
		]
	];
	
	var giftsHtml = '\
			<div class="gifts-set"> \
				<div class="title"> \
					<h2>Подарки за 2</h2> \
				</div> \
				<div class="gifts-line"> \
					<span class="action send-gift" id="gift_1"><img src="images/gifts/coffee.png"></span> \
					<span class="action send-gift" id="gift_2"><img src="images/gifts/cristmas_hat.png"></span> \
					<span class="action send-gift" id="gift_3"><img src="images/gifts/flowers.png"></span> \
					<span class="action send-gift" id="gift_4"><img src="images/gifts/headbox.png"></span> \
					<span class="action send-gift" id="gift_5"><img src="images/gifts/heart.png"></span> \
					<span class="action send-gift" id="gift_6"><img src="images/gifts/heart_flowers.png"></span> \
				</div> \
			</div> \
			<div class="gifts-set"> \
				<div class="title"> \
					<h2>Подарки за 6</h2> \
				</div> \
				<div class="gifts-line"> \
					<span class="action send-gift" id="gift_7"><img src="images/gifts/santa.png"></span> \
					<span class="action send-gift" id="gift_8"><img src="images/gifts/santa2.png"></span> \
					<span class="action send-gift" id="gift_9"><img src="images/gifts/santa3.png"></span> \
					<span class="action send-gift" id="gift_10"><img src="images/gifts/puppy.png"></span> \
				</div> \
			</div> \
			<div class="gifts-set"> \
				<div class="title"> \
					<h2>Подарки за 12</h2> \
				</div> \
				<div class="gifts-line"> \
					<span class="action send-gift" id="gift_11"><img src="images/gifts/snowball.png"></span> \
					<span class="action send-gift" id="gift_12"><img src="images/gifts/xmas_tree.png"></span> \
				</div> \
			</div> \
			<div class="gifts-set"> \
				<div class="title"> \
					<h2>Подарки за 18</h2> \
				</div> \
				<div class="gifts-line"> \
					<span class="action send-gift" id="gift_13"><img src="images/gifts/dress.png"></span> \
				</div> \
			</div> \
			<div class="gifts-set"> \
				<div class="title"> \
					<h2>Подарки за 1</h2> \
					<h3>Доступны только для пользователей со статусом vip</h3> \
				</div> \
				<div class="gifts-line align-center"> \
					<span class="action send-gift" id="gift_70"><img src="images/gifts/vip1.png"></span> \
					<span class="action send-gift" id="gift_80"><img src="images/gifts/vip2.png"></span> \
					<span class="action send-gift" id="gift_90"><img src="images/gifts/vip3.png"></span> \
				</div> \
			</div>'
	
	var firstMessageCount = 0;
	var firstMessages = ['Чертовски привлекателен!', 'Невероятно красив!'];
	var lastMessageId = 100;
			
	function getUsers() {
		return users;
	};
	
	function userDelete(data) {
		return {
			success: true
		}
	};
	
	function getUser(data) {
		return users[data.id];
	};
	
	function getMessages(data) {
		return messages[data.collocutorId];
	};
	
	function getFirstMessageTip() {
		if(firstMessageCount == 0) {
			firstMessageCount +=1;
		} else {
			firstMessageCount = 0;
		}
		
		return {'message': firstMessages[firstMessageCount]};
	};
	
	function sendMessage(data) {
		return {
			'id': lastMessageId++,
			'type': 'message',
			'fromType': 'user',
			'status': '',
			'from': 'Юлия',
			'time': '17:05',
			'text': data.message
		};
	};
	
	function sendRating(data) {
		return {
			'id': lastMessageId++,
			'type': 'rating',
			'fromType': 'user',
			'status': '',
			'from': 'Юлия',
			'time': '17:07',
			'text': ' \
				<img src="images/rating/star_8.png" /> \
				<div class="label align-middle"> \
					Вы оценили. \
				</div> \
				<div class="clear"></div> \
			'
		};
	};
	
	function deleteMessage(data) {
		return {
			'success': true,
			'message': 'Сообщение было удалено.'
		};
	}

	return {
		fakeGetJSON: function(url, data, success) {
			switch(url) {
				case 'users':
					var result = getUsers(data);
					break;
				case 'deleteUser':
					var result = userDelete(data);
					break;
				case 'user':
					var result = getUser(data);
					break;
				case 'messages':
					var result = getMessages(data);
					break;
				case 'firstMessageTip':
					var result = getFirstMessageTip(data);
					break;
				case 'sendMessage':
					var result = sendMessage(data);
					break;
				case 'deleteMessage':
					var result = deleteMessage(data);
					break;
				case 'sendRating':
					var result = sendRating(data);
					break;
				case 'getGifts':
					var result = { 'giftsHtml': giftsHtml };
			}
			
			success(result);
		}
	};
}();