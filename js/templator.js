/*
	Templator
	
	Author Alexander Bezrukov aka versus <god@goan.ru>
*/

var templator = function() {
	var sUserItemTemplate = '\
		<div class="item {active}" id="user_{id}"> \
			<div class="left-block"> \
				<span class="status {status}">&nbsp;</span> \
				<span class="name">{name}</span>, \
				<span class="age">{age}</span> \
			</div> \
			<div class="right-block"> \
				<span class="actions"> \
					<span class="action delete">&nbsp;</span> \
				</span> \
				<span class="unread-message-count corners-big">{unreadMessagesCount}</span> \
				<span class="avatar"><img src="{avatarUrl}" class="corners" /></span> \
			</div> \
		</div> \
	';
	
	var sCollocutorTemplate = '\
		<div class="avatar corners"> \
			<a href="{profileUrl}"> \
				<img src="{bigAvatarUrl}" /> \
			</a> \
		</div> \
		<div class="info"> \
			<a href="{profileUrl}"><span class="name">{name}</span>, <span class="age">{age}</span></a> \
			<div class="place">{place}</div> \
		</div> \
	';
	
	var sMessageTemplate = '\
		<div class="item {type} {status}" id="message_{id}"> \
			<div class="name {fromType}"> \
				{from} \
			</div> \
			<div class="status {status}"></div> \
			<div class="time">{time}</div> \
			<div class="actions"> \
				<span class="action delete">&nbsp;</span> \
			</div> \
			<div class="text"> \
				{text} \
			</div> \
		</div> \
	';
	
	var sFirstMessageTipTemplate = '\
		<div class="tip-box-wrapper"> \
			<div class="tip-box first-message corners"> \
				<div class="actions"> \
					<span class="action first-message-change"><span>Другой комплимент</span></span> \
				</div> \
				<div class="title"> \
					<h1>Начни с интересной фразы</h1> \
					<h2>Произведи впечатление</h2> \
				</div> \
				<div class="text"> \
					<span class="action set-message first-message-text">&laquo;<span>{message}</span>&raquo;</span> \
				</div> \
			</div> \
			<div class="tip-legend"> \
				Напиши первое сообщение \
			</div> \
		</div>\
	';
	
	var sDeleteDialogTemplate = '\
		<div class="dialog-box-wrapper"> \
			<div class="dialog-box message-delete" id="msg_{id}"> \
				<div class="actions"> \
					<span class="action close">&nbsp;</span> \
				</div> \
				<div class="title"> \
					Вы действительно хотите удалить сообщение? \
				</div> \
				<div class="text"> \
					&laquo;{text}&raquo; \
				</div> \
				<div class="buttons"> \
					<span class="action delete"> \
						<img src="images/btn_delete.png" /> \
					</span> \
					<span class="action cancel"> \
						Нет, не надо удалять \
					</span> \
				</div> \
			</div> \
		</div> \
	';
	
	var sRatingDialogTemplate = '\
		<div class="dialog-box-wrapper"> \
			<div class="dialog-box rating"> \
				<div class="actions"> \
					<span class="action close">&nbsp;</span> \
				</div> \
				<div class="title"> \
					Отправьте {name} оценку \
				</div> \
				<div class="text"> \
					<span class="action send-rating rate-1" id="rate_1">&nbsp;</span><span class="action send-rating rate-2" id="rate_2">&nbsp;</span><span class="action send-rating rate-3" id="rate_3">&nbsp;</span><span class="action send-rating rate-4" id="rate_4">&nbsp;</span><span class="action send-rating rate-5" id="rate_5">&nbsp;</span><span class="action send-rating rate-6" id="rate_6">&nbsp;</span><span class="action send-rating rate-7" id="rate_7">&nbsp;</span><span class="action send-rating rate-8" id="rate_8">&nbsp;</span><span class="action send-rating rate-9" id="rate_9">&nbsp;</span><span class="action send-rating rate-10" id="rate_10">&nbsp;</span> \
				</div> \
			</div> \
		</div> \
	';
	
	var sGiftsBoxTemplate = ' \
		<div class="gifts-box"> \
			<div class="actions corners"> \
				<span class="action close">&nbsp;</span> \
			</div> \
			<h1>Подарки</h1> \
			{giftsHtml} \
		</div> \
	';
	
	function prepareTemplate(object, sTemplate) {
		for (var sFieldName in object) {
			sTemplate = sTemplate.replace('{'+ sFieldName +'}', object[sFieldName]);
		}
		jTemplate = jQuery(sTemplate).find('.corners').corner('4px').end();
		
		return jTemplate;
	};
	
	return {
		getUserItem: function(user) {
			var sTemplate = sUserItemTemplate;
			var jTemplate = prepareTemplate(user, sTemplate);
			if(user.unreadMessagesCount == 0) {
				jTemplate.find('.unread-message-count').hide();
			}
			
			return jTemplate;
		},
		
		getCollocutor: function(user) {
			var sTemplate = sCollocutorTemplate;
			return prepareTemplate(user, sTemplate);
		},
		
		getMessageItem: function(message) {
			var sTemplate = sMessageTemplate;
			return prepareTemplate(message, sTemplate);
		},
		
		getFirstMessageItem: function(tip) {
			var sTemplate = sFirstMessageTipTemplate;
			return prepareTemplate(tip, sTemplate);
		},
		
		getDeleteDialogItem: function(message) {
			var sTemplate = sDeleteDialogTemplate;
			return prepareTemplate(message, sTemplate);
		},
		
		getRatingDialogItem: function(user) {
			var sTemplate = sRatingDialogTemplate;
			return prepareTemplate(user, sTemplate);
		},
		
		getGiftsItem: function(data) {
			var sTemplate = sGiftsBoxTemplate;
			return prepareTemplate(data, sTemplate);
		}
	};
}();