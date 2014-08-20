
/* Module-specific javascript can be placed here */

$(document).ready(function() {
	handleButton($('#et_save'),function() {
	});

	handleButton($('#et_cancel'),function(e) {
		if (m = window.location.href.match(/\/update\/[0-9]+/)) {
			window.location.href = window.location.href.replace('/update/','/view/');
		} else {
			window.location.href = baseUrl+'/patient/episodes/'+et_patient_id;
		}
		e.preventDefault();
	});

	handleButton($('#et_deleteevent'));

	handleButton($('#et_canceldelete'),function(e) {
		if (m = window.location.href.match(/\/delete\/([0-9]+)/)) {
			window.location.href = baseUrl+'/patient/parentEvent/'+m[1];
		} else {
			window.location.href = baseUrl+'/patient/episodes/'+et_patient_id;
		}
		e.preventDefault();
	});

	$('select.populate_textarea').unbind('change').change(function() {
		if ($(this).val() != '') {
			var cLass = $(this).parent().parent().parent().attr('class').match(/Element.*/);
			var el = $('#'+cLass+'_'+$(this).attr('id'));
			var currentText = el.text();
			var newText = $(this).children('option:selected').text();

			if (currentText.length == 0) {
				el.text(ucfirst(newText));
			} else {
				el.text(currentText+', '+newText);
			}
		}
	});

	$('.addTest').click(function(e) {
		e.preventDefault();

		var i = 0;

		$('tbody.transactions').children('tr').children('td').children('input:first').map(function() {
			var id = $(this).attr('name').match(/[0-9]+/);

			if (id >= i) {
				i = id;
			}
		});

		$.ajax({
			'type': 'GET',
			'url': baseUrl+'/OphInDnaextraction/default/addTransaction?i='+i,
			'success': function(html) {
				$('tbody.transactions').append(html);
				$('#no-tests').hide();
			}
		});
	});

	$('.removeTransaction').die('click').live('click',function(e) {
		e.preventDefault();
		$(this).parent().parent().remove();
		if(!$('.removeTransaction').length) {
			$('#no-tests').show();
		}
		
	});
});

function ucfirst(str) { str += ''; var f = str.charAt(0).toUpperCase(); return f + str.substr(1); }

function eDparameterListener(_drawing) {
	if (_drawing.selectedDoodle != null) {
		// handle event
	}
}
