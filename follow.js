$(function(){

	//何人フォローするか確認
	count = window.prompt("何人フォローするか数字を入力してください", 10);
	count = parseInt(count);
	
	//followした人数
	following = 0;
	
	//スクロールして先を読み込んだか判定
	scrolled = 0;
	
	//結果を出力するViewの挿入
	$('body').append('<div id="appstars_follow_status" style="position: fixed; width: 200px; height: 72px; padding: 14px; left: 14px; bottom: 14px; background-color:rgba(0,0,0,0.8); color:#fefefe; line-height: 28px; font-size: 12px; border-radius: 5px; z-index: 999999;"></div>');
	
	//途中経過を表示するメソッド（目標,調べた数,実際のフォロー
	var log = function(c, f) {
		$('#appstars_follow_status').html('フォロー数：'+f+'/'+c+'<div style="text-align: right;"><a href="http://www.appstars.jp/" target="_blank" style="color: #efefef; text-decoration: none;">powered by あぷすた</a></div>');
	}

	//フォローするメソッド
	var follow = function() {
		log(count, following);
		if(following < count) {
			//フォローボタンを調査
			var $btns = $('.GridTimeline .not-following .js-follow-btn');
			if($btns.length) {
				$btns.eq(0).click();
				following++;
				scrolled = 0;
				setTimeout(function(){
					follow();
				}, 500);
			}
			else {
				scrolled++;
				if(scrolled > 3) {
					alert('ユーザーが見つかりませんでした。終了します。');
					return;
				}
				$(window).scrollTop(999999);
				setTimeout(function(){
					follow();
				}, 3000 * scrolled);
			}
		}
		else {
			alert('完了しました。');	
		}
	};
	
	//Start
	follow(0, false);
});
