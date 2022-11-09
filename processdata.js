<script>
  // currency pecahan titik
  var jmlKolTitik = document.querySelectorAll('.custom_input_text').length;
  for (var i = 1; i <= jmlKolTitik; i++) {
    $('#titik' + i).keyup(function() {
      var titik = $(this).val();
      $(this).val(currency_correction(titik));

    });

  }

  function currency_correction(number) {

    number_string = number.replace(/[^,\d]/g, '').toString()
    split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    return split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  }

  // currency pecahan koma
  var jmlKolKoma = document.querySelectorAll('.custom_input_text').length;
  for (var k = 1; k <= jmlKolKoma; k++) {
    $('#koma' + k).keyup(function() {
      var koma = $(this).val();
      $(this).val(currency_correction_koma(koma));

    });

  }

  // currency format NPWP
  var jmlKolNPWP = document.querySelectorAll('.custom_input_text').length;
  for (var n = 1; n <= jmlKolNPWP; n++) {
    $('#npwp' + n).inputmask({
      mask: '99.999.999.9-999.999',
      clearIncomplete: true,
      definitions: {
        A: {
          validator: "[A-Za-z0-9 ]"
        },
      },
    });

  }

  // currency format FAKTUR PAJAK
  var jmlKolFaktur = document.querySelectorAll('.custom_input_text').length;
  for (var n = 1; n <= jmlKolFaktur; n++) {
    $('#faktur' + n).inputmask({
      mask: '999.999-99.99999999',
      clearIncomplete: true,
      definitions: {
        A: {
          validator: "[A-Za-z0-9 ]"
        },
      },
    });

  }

  function currency_correction_koma(number) {

    number_string = number.replace(/[^\d]/g, '').toString()
    split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join(',');
    }

    split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

    var ValKoma = rupiah.replace(".", ",");

    return ValKoma;
  }

  // currency pecahan titik
  var jmlKoFormatNumber = document.querySelectorAll('.custom_input_text').length;
  for (var i = 1; i <= jmlKoFormatNumber; i++) {
    $('#format_number' + i).keyup(function() {
      var titik = $(this).val();
      $(this).val(number_correction(titik));

    });

  }

  function number_correction(number) {
    number_string = number.replace(/[^\d]/g, '').toString()
    return number_string;
  }


  $('.btn-success').on('click', function() {

    $('.select-required').each(function() {
      $(this).off('change');

      var width = $(this).attr("data-width") || '100px';
      $(this).select2({
        //theme: 'bootstrap4',
        placeholder: "Choose Select",
        width: width,
        dropdownAutoWidth: true
      });
      var x = this.required;
      if (x) {
        $(this).next().children().children().each(function() {
          $(this).css("border-color", "#f8ac59");
        });
      }
    });
  });

  function formatTblMonitoring(d) {
    html = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:100%;">';
    html = '<tr>' +
      '<th>View</th>' +
      '<th>Request No</th>' +
      '<th>Requester Name</th>' +
      '<th>Current Position</th>' +
      '<th>Status</th>' +
      '</tr>';
    for (i = 0; i < d.detail.length; i++) {
      html +=
        '<tr>' +
        '<td width="100px"> ' + d.detail[i]['button'] + '</td>' +
        '<td width="100px">' + d.detail[i]['ticket'] + '</td>' +
        '<td width="100px">' + d.detail[i]['requester'] + '</td>' +
        '<td width="160px">' + d.detail[i]['node_name'] + '</td>' +
        '<td width="160px"> ' + d.detail[i]['status'] + '</td>' +
        '</tr>';
    }
    html += '</table>';

    return html;
  }

  function myFunctionCheckDaterange() {
    var checkBox = document.getElementById("checkdaterange");
    if (checkBox.checked == true) {
      $("#filter_daterange").removeAttr('disabled');
      $("#filter_daterange").removeClass('btn-secondary');
      $("#filter_daterange").addClass('btn-primary');
      $("#daterange").removeAttr('disabled')
      $("#daterange").val("2022/11/01 - 2022/11/08").trigger('change');
      $("#daterange_val").val("2022/11/01 - 2022/11/08").trigger('change');
      $('#datalist_monitor').DataTable().ajax.reload();
      $("#daterange").focus();

    } else {
      $('#daterange').val("");
      $('#daterange_val').val("null");
      $('#datalist_monitor').DataTable().ajax.reload();

      $("#filter_daterange").removeClass('btn-primary');
      $("#filter_daterange").addClass('btn-secondary');
      $("#filter_daterange").attr('disabled', true);
      $("#daterange").attr('disabled', true);
    }
  }

  $(document).ready(function() {
    $('#filter-monitor').click(function() {
      $('#modal-filter').modal('show');
    });

    $('#created_at').daterangepicker({
      autoUpdateInput: false,
      locale: {
        format: 'YYYY/MM/DD'
      }
    }).on("apply.daterangepicker", function(e, picker) {
      picker.element.val(picker.startDate.format(picker.locale.format) + ' - ' + picker.endDate.format(picker.locale.format));
    });

    $('#data_log_end').daterangepicker({
      autoUpdateInput: false,
      locale: {
        format: 'YYYY/MM/DD'
      }
    }).on("apply.daterangepicker", function(e, picker) {
      picker.element.val(picker.startDate.format(picker.locale.format) + ' - ' + picker.endDate.format(picker.locale.format));
    });

    //get_process_menus();

    var Server;
    //Server = new FancyWebSocket('ws://10.194.179.115:3900');
          Server = new FancyWebSocket('wss://103.252.163.180:3900');
    
    //Server = new FancyWebSocket('ws://127.0.0.1:9200');
    //tangkap apakah ada action dr client manapun
    var user_id = 4;

    Server.bind('message', function(payload) {
      switch (payload) {
        case 'process_list_ticket':
          message = [];
          cekUserOnline(user_id);
          $('#datalist').DataTable().ajax.reload();
          $('#datalist_monitor').DataTable().ajax.reload();
          //get_process_menus();


          break;
      }
    });

    $('.menu').click(function() {
      //alert('ok');
      //cekUserOnline(user_id);
      $.ajax({
          url: "https://dev-mydx.infomedia.co.id/process/data/cek_user_online",
          data: {
            "user_id": user_id,
            "app_token": "42f894028f0df72683fe3904cefcabad"
          },
          type: "POST",
          dataType: 'json',
        })
        .done(function(data) {
          //$("#progress_step").html(data);
          if (data.status == true) {
            console.log(data.is_login);
          }
        });

      
      //Server.send('message', 'process_list_ticket');
    });

    function cekUserOnline(user_id) {
      $.ajax({
          url: "https://dev-mydx.infomedia.co.id/process/data/cek_user_online",
          data: {
            "user_id": user_id,
            "app_token": "42f894028f0df72683fe3904cefcabad"
          },
          type: "POST",
          dataType: 'json',
        })
        .done(function(data) {
          //$("#progress_step").html(data);
          if (data.status == true) {
            console.log(data.is_login);
          }
        });

    }

    /*
    function cekUserOffline(user_id){
      $.ajax({
        url: "https://dev-mydx.infomedia.co.id/process/data/cek_user_offline",
        data: {"user_id":user_id,"app_token":"42f894028f0df72683fe3904cefcabad"},
        type: "POST",
        dataType: 'json',
      })
        .done(function(data) {
          //$("#progress_step").html(data);
          if(data.status == true){
            console.log(data.is_login);
          }
        });
      
    }
    */

    //Let the user know we're connected
    Server.bind('open', function(data) {
      console.log('connected');
      //cekUserOnline(user_id);
    });

    //OH NOES! Disconnection occurred.
    Server.bind('close', function(data) {
      console.log('disconected');
    });

    Server.connect();

    var message = [];

    var kolom = [0];
    for (i = 2; i <= 12; i++) {
      kolom.push(i)
    }

    var kolomHistory = [0];
    for (i = 1; i <= 12; i++) {
      kolomHistory.push(i)
    }

    var kolomMonitoring = [2];
    for (i = 2; i <= 12; i++) {
      kolomMonitoring.push(i)
    }

    /*
    $('#datalist_monitor thead tr')
        .clone(true)
        .addClass('filters')
        .appendTo('#datalist_monitor thead');
    */

    // var daterange = $('#daterange').val();
    var datalist = $('#datalist').DataTable({
      dom: "<'row'<'col-sm-3'l><'col-sm-6 text-center'B><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      orderCellsTop: true,
      fixedHeader: true,

      buttons: [{
          extend: 'copyHtml5',
          text: '<i class="fas fa-clipboard"></i>',
          className: 'btn btn-primary',
          titleAttr: 'Copy to Clipboard'
        },
        {
          extend: 'excelHtml5',
          text: '<i class="fas fa-file-excel"></i>',
          className: 'btn btn-success',
          titleAttr: 'Export to Excel'
        },
        {
          extend: 'csvHtml5',
          text: '<i class="fas fa-file-csv"></i>',
          className: 'btn btn-warning',
          titleAttr: 'Export to CSV'
        }
      ],

      // "scrollX": true,
      "processing": true,
      "serverSide": true,
      "stateSave": true,
      "order": [],
      "ajax": {
        "url": "https://dev-mydx.infomedia.co.id/process/data/list/" + 1710,
        "data": {
          "type_nodes": "null",
          "app_token": "42f894028f0df72683fe3904cefcabad"
        },
        "type": "POST",
      },
      "columnDefs": [{
          "targets": [0, 1],
          "orderable": false,
        },
        {
          "targets": [0, 1],
          "searchable": false,
        },

        {
          "targets": kolom,
          "className": "view_detail"
        }
      ],
      "drawCallback": function(settings, json) {
        $('[data-toggle="tooltip"]').tooltip();
        $('td.view_detail').on('click', function() {
          var id = $(this).parent().data("id");
          $(location).attr('href', 'https://dev-mydx.infomedia.co.id/process/data/view/' + id);
        });
        $('th').removeClass('view_detail');
        $('.delete').on('click', function() {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              $.ajax({
                  url: 'https://dev-mydx.infomedia.co.id/process/data/delete',
                  enctype: 'multipart/form-data',
                  data: {
                    "id": $(this).data('id'),
                    "app_token": "42f894028f0df72683fe3904cefcabad"
                  },
                  type: 'POST',
                  dataType: 'json',
                })
                .done(function(data) {
                  if (data.status == true) {
                    Swal.fire(
                      'Deleted!',
                      data.message,
                      'success'
                    ).then(function() {
                      $('#datalist').DataTable().ajax.reload();
                    });
                  } else {
                    Swal.fire(
                      'Failed!',
                      data.message,
                      'error'
                    );
                  }
                });

            }
          });
        });
        $('.edit').on('click', function() {
          $(location).attr('href', 'https://dev-mydx.infomedia.co.id/process/data/update/' + $(this).data('id') + '/' + '1710');
        });

        $('.view_digidoc').on('click', function() {
          // $(location).attr('href','https://dev-mydx.infomedia.co.id/process/data/digidoc/'+$(this).data('id')+'/'+'1710');
          id = $(this).data('id');
          $.ajax({
              url: 'https://dev-mydx.infomedia.co.id/process/data/check_docSigned',
              enctype: 'multipart/form-data',
              data: {
                "id": $(this).data('id'),
                "app_token": "42f894028f0df72683fe3904cefcabad"
              },
              type: 'POST',
              dataType: 'json',
            })
            .done(function(data) {
              if (data.status == true) {
                window.open(data.url, '_blank');
              } else {
                window.open('https://dev-mydx.infomedia.co.id/process/data/digidoc/' + id + '/' + '1710', '_blank');
              }
            });
        });

        $('.preview_digidoc').on('click', function() {
          let doc_html = getDocHTML($(this).data('id'));
          if ($("#view-doc").html() != '') {
            $("#modal-view-doc").modal('show');
          }
        });

        $('.subflow_ticket').on('click', function() {
          $('.preloader').fadeIn('fast');
          $.ajax({
              url: 'https://dev-mydx.infomedia.co.id/process/data/subflow_ticket',
              enctype: 'multipart/form-data',
              data: {
                "id": $(this).data('id'),
                "process_id": "75",
                "node_id": 1710,
                "app_token": "42f894028f0df72683fe3904cefcabad"
              },
              type: 'POST',
              dataType: 'json',
            })
            .done(function(data) {
              $('.preloader').fadeOut('fast');
              if (data.status == true) {
                Swal.fire(
                  'Sucess!',
                  data.message,
                  'success'
                ).then(function() {
                  $('#datalist').DataTable().ajax.reload();
                });
              } else {
                Swal.fire(
                  'Warning!',
                  data.message,
                  'error'
                ).then(function() {
                  return false;
                });
              }
            });
        });

        $('.update').on('click', function() {
          cekUserOnline(user_id);
          $.ajax({
              url: 'https://dev-mydx.infomedia.co.id/process/data/pickup',
              enctype: 'multipart/form-data',
              data: {
                "id": $(this).data('id'),
                "node_id": 1710,
                "app_token": "42f894028f0df72683fe3904cefcabad"
              },
              type: 'POST',
              dataType: 'json',
            })
            .done(function(data) {
              if (data.status == true) {
                Swal.fire(
                  'Picked Up!',
                  data.message,
                  'success'
                ).then(function() {
                  //Server.send('message', 'process_list_ticket');
                                    $(location).attr('href', 'https://dev-mydx.infomedia.co.id/process/data/update/' + data.id + '/' + data.node_id);
                });
              } else {
                Swal.fire(
                  'Picked Up!',
                  data.message,
                  'error'
                ).then(function() {

                  //Server.send('message', 'process_list_ticket');
                                    $('#datalist').DataTable().ajax.reload();
                });
              }
            });
        });
        $('.submit').on('click', function() {
          if (validation_submit($(this).data('id'), settings.json.data)) {
            Swal.fire({
              type: 'question',
              title: "Are you sure!",
              text: "Write your description:",
              input: 'text',
              showCancelButton: true,
              confirmButtonText: 'Yes, submit it!',
              preConfirm: (notes) => {
                if (notes == '') {
                  Swal.showValidationMessage('Please write your description')
                }
              },
            }).then((result) => {
              $('.preloader').fadeOut('fast');
              if (result.value) {
                $('.preloader').fadeOut('fast');
                $.ajax({
                    url: 'https://dev-mydx.infomedia.co.id/process/data/form_submit',
                    enctype: 'multipart/form-data',
                    data: {
                      "flow_request_id": $(this).data('id'),
                      "flow_node_id": 1710,
                      "action": "Update",
                      "notes": result.value,
                      "process_action": "Request",
                      "app_token": "42f894028f0df72683fe3904cefcabad"
                    },
                    type: 'POST',
                    dataType: 'json',
                  })
                  .done(function(data) {
                    $('.preloader').fadeOut('fast');
                    if (data.status == true) {
                      Swal.fire(
                        'Your data has been submitted!',
                        data.message,
                        'success'
                      ).then(function() {
                        //Server.send('message', 'process_list_ticket');
                                                $('#datalist').DataTable().ajax.reload();
                      });
                    } else {
                      Swal.fire('Failed!', data.message, 'error');
                    }
                  });
              } else {
                Swal.showValidationMessage(
                  'Request failed: ${error}'
                )
              }
            });

          };
        })

      },

      createdRow: function(row, data, index) {
        $(row).attr('data-id', data[12 + 3]);
        // $(row).attr('data-id', data[12 + 2]);

        $(row).attr('style', 'cursor:pointer;');
      }
    });

    /*
    var datalist_monitor = $('#datalist_monitor').dataTable({
      dom: "<'row'<'col-sm-3'l><'col-sm-6 text-center'B><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      orderCellsTop: true,
      fixedHeader: true,
      
      
      initComplete: function () {
            var api = this.api();
 
            // For each column
            api
                .columns()
                .eq(0)
                .each(function (colIdx) {
                    // Set the header cell to contain the input element
                    var cell = $('.filters th').eq(
                        $(api.column(colIdx).header()).index()
                    );
                    var title = $(cell).text();
                    $(cell).html('<input type="text" placeholder="' + title + '" />');
 
                    // On every keypress in this input
                    $(
                        'input',
                        $('.filters th').eq($(api.column(colIdx).header()).index())
                    )
                        .off('keyup change')
                        .on('change', function (e) {
                            // Get the search value
                            $(this).attr('title', $(this).val());
                            var regexr = '{search}'; //$(this).parents('th').find('select').val();
 
                            var cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api
                                .column(colIdx)
                                .search(
                                    this.value != ''
                                        ? regexr.replace('{search}', '' + this.value + '')
                                        : '',
                                    this.value != '',
                                    this.value == ''
                                )
                                .draw();
                        })
                        .on('keyup', function (e) {
                            e.stopPropagation();
 
                            $(this).trigger('change');
                            $(this)
                                .focus()[0]
                                .setSelectionRange(cursorPosition, cursorPosition);
                        });
                });
      },
      
      buttons: [{
          extend: 'copyHtml5',
          text: '<i class="fas fa-clipboard"></i>',
          className: 'btn btn-primary',
          titleAttr: 'Copy to Clipboard'
        },
        {
          extend: 'excelHtml5',
          text: '<i class="fas fa-file-excel"></i>',
          className: 'btn btn-success',
          title: '',
          titleAttr: 'Export to Excel'
        },
        {
          extend: 'csvHtml5',
          text: '<i class="fas fa-file-csv"></i>',
          className: 'btn btn-warning',
          title: '',
          titleAttr: 'Export to CSV'
        }
      ],

      // "scrollX": true,
      "processing": true,
      "serverSide": true,
      //"stateSave": true,
      "scrollY": 350,
      "scrollX": true,
      "scrollCollapse": true,
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      

      "order": [],
      "ajax": {
        "url": "https://dev-mydx.infomedia.co.id/process/data/list_monitoring/" + 1710,
        //"data":{"daterange":daterange,"app_token":"42f894028f0df72683fe3904cefcabad"},
        "type": "POST",
        "data": function(d) {
          d.daterange = $('#daterange').val();
          d.app_token = '42f894028f0df72683fe3904cefcabad';
        },
      },
      "columnDefs": [{
          "targets": [0, 1, ],
          "orderable": false,
        },
        {
          "targets": [0, 1, ],
          "searchable": false,
        },
        {
          "targets": kolomMonitoring,
          "className": "view_detail"
        },

        {
          "targets": [0],
          "className": "details-control",
          "orderable": false,
        }

      ],

      "drawCallback": function(settings, json) {
        $('[data-toggle="tooltip"]').tooltip();
        $('td.view_detail').on('click', function() {
          var id = $(this).parent().data("id");
          $(location).attr('href', 'https://dev-mydx.infomedia.co.id/process/data/view/' + id);
        });
        $('th').removeClass('view_detail');

        var getAllRow  = $('#datalist_monitor tbody tr').find("td:eq(1)");
        $.each(getAllRow, (i,val) => {
          if($(val)[0].innerHTML == ""){
            var checkRow = $('#datalist_monitor tbody').find(`tr:eq(${i})`).find("td:eq(0)").removeClass("details-control").addClass("details-control-close");
          }
        });
      },

      createdRow: function(row, data, index) {
        $(row).attr('data-id', data[12 + 3]);
        $(row).attr('style', 'cursor:pointer;');
      }
      

    });
    */

    /* datalist history monitoring */
    var datalist_history_monitor = $('#datalist_history_monitor').dataTable({


      dom: "<'row'<'col-sm-3'l><'col-sm-6 text-center'B><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      orderCellsTop: true,
      fixedHeader: true,

      buttons: [{
          extend: 'copyHtml5',
          text: '<i class="fas fa-clipboard"></i>',
          className: 'btn btn-primary',
          titleAttr: 'Copy to Clipboard'
        },
        {
          extend: 'excelHtml5',
          text: '<i class="fas fa-file-excel"></i>',
          className: 'btn btn-success',
          title: '',
          titleAttr: 'Export to Excel'
        },
        {
          extend: 'csvHtml5',
          text: '<i class="fas fa-file-csv"></i>',
          className: 'btn btn-warning',
          title: '',
          titleAttr: 'Export to CSV'
        }
      ],

      "processing": true,
      "serverSide": true,
      "scrollY": 350,
      "scrollX": true,
      "scrollCollapse": true,

      "lengthMenu": [
        [-1],
        ["All"]
      ],


      "order": [],
      "ajax": {
        "url": "https://dev-mydx.infomedia.co.id/process/data/list_history_monitoring/" + 1710,
        //"data":{"daterange":daterange,"app_token":"42f894028f0df72683fe3904cefcabad"},
        "type": "POST",
        "data": function(d) {
          d.daterange = $('#daterange_val').val();
          d.app_token = '42f894028f0df72683fe3904cefcabad';
        },
      },

      "columnDefs": [{
          "targets": [0, 1, ],
          "orderable": false,
        },
        {
          "targets": [0, 1, ],
          "searchable": false,
        },
        {
          "targets": kolomHistory,
          "className": "view_detail"
        },

        {
          "targets": [1],
          "className": "details-control",
          "orderable": false,
        }

      ],

      "drawCallback": function(settings, json) {

        $('[data-toggle="tooltip"]').tooltip();
        /*
        $('td.view_detail').on('click', function() {
          var id = $(this).parent().data("id");
          $(location).attr('href', 'https://dev-mydx.infomedia.co.id/process/data/view/' + id);
        });
        */
        $('th').removeClass('view_detail');

      },
      createdRow: function(row, data, index) {
        $(row).attr('data-id', data[12 + 4]);
        $(row).attr('style', 'cursor:pointer;');
      },


    });

    /* datalist monitoring */
    var datalist_monitor = $('#datalist_monitor').DataTable({
      dom: "<'row'<'col-sm-3'l><'col-sm-6 text-center'B><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      orderCellsTop: true,
      fixedHeader: true,

      buttons: [{
          extend: 'copyHtml5',
          text: '<i class="fas fa-clipboard"></i>',
          className: 'btn btn-primary',
          titleAttr: 'Copy to Clipboard'
        },
        {
          extend: 'excelHtml5',
          text: '<i class="fas fa-file-excel"></i>',
          className: 'btn btn-success',
          title: '',
          titleAttr: 'Export to Excel'
        },
        {
          extend: 'csvHtml5',
          text: '<i class="fas fa-file-csv"></i>',
          className: 'btn btn-warning',
          title: '',
          titleAttr: 'Export to CSV'
        }
      ],

      // "scrollX": true,
      "processing": true,
      "serverSide": true,
      //"stateSave": true,
      // "scrollY": 350,
      // "scrollX": true,
      "scrollCollapse": true,
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],


      "order": [],
      "ajax": {
        "url": "https://dev-mydx.infomedia.co.id/process/data/list_monitoring/" + 1710,
        //"data":{"daterange":daterange,"app_token":"42f894028f0df72683fe3904cefcabad"},
        "type": "POST",
        "data": function(d) {
          let form_filter_monitor = $('#form-filter-monitor').serializeArray();

          $.each(form_filter_monitor, function(k, v) {
            d[v.name] = v.value;
          });

          // d.created_at = $('#created_at').val();
          d.app_token = '42f894028f0df72683fe3904cefcabad';
        },
      },
      "columnDefs": [{
          "targets": [0, 1],
          "orderable": false,
        },
        {
          "targets": [0, 1],
          "searchable": false,
        },
        {
          "targets": kolomMonitoring,
          "className": "view_detail"
        },
        {
          "targets": [0],
          "className": "details-control",
          "orderable": false,
        }
      ],
      "drawCallback": function(settings, json) {
        $('[data-toggle="tooltip"]').tooltip();
        $('td.view_detail').on('click', function() {
          var id = $(this).parent().data("id");
          $(location).attr('href', 'https://dev-mydx.infomedia.co.id/process/data/view/' + id);
        });
        $('th').removeClass('view_detail');

      },
      createdRow: function(row, data, index) {
        $(row).attr('data-id', data[12 + 3]);
        $(row).attr('style', 'cursor:pointer;');
      },

      initComplete: function() {
        this.api().columns().every(function() {
          var that = this;
          $('input', this.footer()).on('keyup change clear', function() {
            that
              .search(this.value)
              .draw();
          });
        });
      },

    });

    $('#datalist_monitor tbody').on('click', 'tr td .view_parallel', function() {
      $(location).attr('href', 'https://dev-mydx.infomedia.co.id/process/data/view_parallel/' + $(this).data('id'));
    });

    $('#datalist_monitor tbody').on('click', 'tr td.details-control', function() {

      var tr = $(this).closest('tr');
      var row = datalist_monitor.row(tr);

      if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shown');
      } else {

        row.child(formatTblMonitoring(row.data())).show();
        tr.addClass('shown');
      }

    });

    $('#btn-filter').click(function() {
      $('#form-filter-monitor').submit();
    });

    $('#form-filter-monitor').submit(function(e) {
      e.preventDefault();
      datalist_monitor.ajax.reload();
    });

    $('#filter_daterange').on('click', function(e) {
      var daterange = $('#daterange').val();
      $('#daterange_val').val(daterange);
      $('#datalist_monitor').DataTable().ajax.reload();
    });


    $('#datalist_monitor tfoot th').each(function(e) {
      var title = $(this).text();
      $(this).html('<input type="text" class="kolom_search' + e + '" placeholder="Search ' + title + '" />');
    });

    $('.kolom_search0').attr('hidden', true);
    $('.kolom_search1').attr('hidden', true);


    /*
    $("#filter_daterange").submit(function(e) {
      e.preventDefault();
      $('#datalist').DataTable().ajax.reload();
    })
    */
    $('.menu').removeClass('active');
    $('#node_1710').addClass('active');
    $('#node_1710').parent().parent().parent('.has-treeview').addClass('menu-open');

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
      $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });


    /*
    $('#doc_type').on('change', function(e) {
      //var doc_type = $(this).val();
      var doc_type = $('#doc_type').val();
      if (doc_type == 'import' || doc_type == 'upload_all' || doc_type == 'upload_support_doc' || doc_type == 'import_transpose') {
        $('#doc_sub_type').attr('hidden', 'true');
      } else {
        $('#doc_sub_type').removeAttr('hidden');
      }
      if (doc_type == 'upload_all' || doc_type == 'upload_support_doc') {
        $('#request_type').attr('hidden', 'true');
      } else {
        $('#request_type').removeAttr('hidden');
      }
      if (doc_type == 'import' || doc_type == 'upload' || doc_type == 'upload_all' || doc_type == 'import_transpose') {
        $('#doc_support').attr('hidden', 'true');
      } else {
        $('#doc_support').removeAttr('hidden');
      }
    });
    */
    $('#doc_type').on('change', function(e) {
      var doc_type = $('#doc_type').val();
      if (doc_type == 'upload_all') {
        $("#request_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_sub_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_support").closest('.form-group').attr('hidden', 'true');
        $('#doc_support').attr('hidden', 'true');
        $('.process-ocr').css('display', 'none');
        $('.process-scan').css('display', 'none');
        $('.submit-attachment').prop('disabled', false);
        $("#field_ocr").closest('.form-group').attr('hidden', 'true');
        $("#scannerName").closest('.form-group').attr('hidden', 'true');
        $('#scannerName').attr('hidden', 'true');
        $("#resolution").closest('.form-group').attr('hidden', 'true');
        $('#resolution').attr('hidden', 'true');
        $("#file").closest('.form-group').removeAttr('hidden', 'true');
        $('#file').removeAttr('hidden');
      } else if (doc_type == 'upload_support_doc') {
        $("#request_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_sub_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_support").closest('.form-group').removeAttr('hidden', 'true');
        $("#field_ocr").closest('.form-group').attr('hidden', 'true');
        $('.process-ocr').css('display', 'none');
        $('.process-scan').css('display', 'none');
        $('.submit-attachment').prop('disabled', false);
        $('#doc_support').removeAttr('hidden');
        $("#scannerName").closest('.form-group').attr('hidden', 'true');
        $('#scannerName').attr('hidden', 'true');
        $("#resolution").closest('.form-group').attr('hidden', 'true');
        $('#resolution').attr('hidden', 'true');
        $("#file").closest('.form-group').removeAttr('hidden', 'true');
        $('#file').removeAttr('hidden');
      } else if (doc_type == 'import' || doc_type == 'import_transpose') {
        $("#request_type").closest('.form-group').removeAttr('hidden', 'true');
        $("#doc_sub_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_support").closest('.form-group').attr('hidden', 'true');
        $('#doc_support').attr('hidden', 'true');
        $('.process-ocr').css('display', 'none');
        $('.process-scan').css('display', 'none');
        $("#field_ocr").closest('.form-group').attr('hidden', 'true');
        $('.submit-attachment').prop('disabled', false);
        $("#scannerName").closest('.form-group').attr('hidden', 'true');
        $('#scannerName').attr('hidden', 'true');
        $("#resolution").closest('.form-group').attr('hidden', 'true');
        $('#resolution').attr('hidden', 'true');
        $("#file").closest('.form-group').removeAttr('hidden', 'true');
        $('#file').removeAttr('hidden');
      } else if (doc_type == 'upload_ocr') {
        $("#request_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_sub_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_support").closest('.form-group').attr('hidden', 'true');
        $('#doc_support').attr('hidden', 'true');
        $("#field_ocr").closest('.form-group').removeAttr('hidden', 'true');
        $('#field_ocr').removeAttr('hidden');
        $('.process-ocr').css('display', 'block');
        $('.process-scan').css('display', 'none');
        $('.submit-attachment').prop('disabled', true);
        $("#scannerName").closest('.form-group').attr('hidden', 'true');
        $('#scannerName').attr('hidden', 'true');
        $("#resolution").closest('.form-group').attr('hidden', 'true');
        $('#resolution').attr('hidden', 'true');
        $("#file").closest('.form-group').removeAttr('hidden', 'true');
        $('#file').removeAttr('hidden');
      } else if (doc_type == 'upload_ocr_support') {
        $("#request_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_sub_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_support").closest('.form-group').removeAttr('hidden', 'true');
        $('#doc_support').removeAttr('hidden');
        $("#field_ocr").closest('.form-group').removeAttr('hidden', 'true');
        $('#field_ocr').removeAttr('hidden');
        $('.process-ocr').css('display', 'block');
        $('.process-scan').css('display', 'none');
        $('.submit-attachment').prop('disabled', true);
        $("#scannerName").closest('.form-group').attr('hidden', 'true');
        $('#scannerName').attr('hidden', 'true');
        $("#resolution").closest('.form-group').attr('hidden', 'true');
        $('#resolution').attr('hidden', 'true');
        $("#file").closest('.form-group').removeAttr('hidden', 'true');
        $('#file').removeAttr('hidden');
      } else if (doc_type == 'upload_scan') {
        $("#request_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_sub_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_support").closest('.form-group').attr('hidden', 'true');
        $('#doc_support').attr('hidden', 'true');
        $("#file").closest('.form-group').attr('hidden', 'true');
        $('#file').attr('hidden', 'true');
        $('.process-ocr').css('display', 'none');
        $('.process-scan').css('display', 'block');
        $("#field_ocr").closest('.form-group').attr('hidden', 'true');
        $("#scannerName").closest('.form-group').removeAttr('hidden', 'true');
        $('#scannerName').removeAttr('hidden');
        $("#resolution").closest('.form-group').removeAttr('hidden', 'true');
        $('#resolution').removeAttr('hidden');
        $('.submit-attachment').prop('disabled', true);
      } else if (doc_type == 'upload_scan_support') {
        $("#request_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_sub_type").closest('.form-group').attr('hidden', 'true');
        $("#doc_support").closest('.form-group').removeAttr('hidden', 'true');
        $('#doc_support').removeAttr('hidden');
        $('.process-ocr').css('display', 'none');
        $('.process-scan').css('display', 'block');
        $("#field_ocr").closest('.form-group').attr('hidden', 'true');
        $("#file").closest('.form-group').attr('hidden', 'true');
        $('#file').attr('hidden', 'true');
        $("#scannerName").closest('.form-group').removeAttr('hidden', 'true');
        $('#scannerName').removeAttr('hidden');
        $("#resolution").closest('.form-group').removeAttr('hidden', 'true');
        $('#resolution').removeAttr('hidden');
        $('.submit-attachment').prop('disabled', true);
      }

    });

    $('#request_type').on('change', function(e) {
      //var request_type = $(this).val();
      var request_type = $('#request_type').val();
      if (request_type == '') {
        $('#download_excel_template').attr('hidden', 'true');
        $('#doc_sub_type').attr('hidden', 'true');
      } else {
        if ($('#doc_type').val() == 'upload') {
          $('#doc_sub_type').removeAttr('hidden');
          $('#doc_sub_type').find('option').remove().end().append('<option value="">Pilih</option>').val('');
          $.getJSON('https://dev-mydx.infomedia.co.id/process/data/get_doc_sub_type/' + 1710 + '/' + request_type, function(data) {
            if (data) {
              $('#doc_sub_type').append(data);
            }
          });
        }
        $('#download_excel_template').removeAttr('hidden');
        $('#type_download_excel').html(request_type.replace('_', ' '));
      }
    });

    $('#btn-add-attachment').on('click', function(e) {
      $('#add_attachments')[0].reset();
      // $("input[type='text']").each(function() {
      //   $(this).val("");
      // });
      $(".defineFormSelect2").val('').trigger('change');
      $('#download_excel_template').attr('hidden', 'true');
      $('#type_download_excel').html('');
      //$('#request_type').attr('hidden', 'true');
      $("#request_type").closest('.form-group').attr('hidden', 'true');
      $("#doc_sub_type").closest('.form-group').attr('hidden', 'true');
      $("#doc_support").closest('.form-group').attr('hidden', 'true');


      // $('#doc_sub_type').attr('hidden', 'true');
      $('#doc_sub_type').find('option').remove().end().append('<option value="">Pilih</option>').val('');

      $("#field_ocr").closest('.form-group').attr('hidden', 'true');
      $("#scannerName").closest('.form-group').attr('hidden', 'true');
      $("#resolution").closest('.form-group').attr('hidden', 'true');
    });

  });

  $("#daterange").val("2022/11/01 - 2022/11/08").trigger('change');

  function download_attachment_template(id) {
    var doc_type = $('#doc_type').val();
    var request_type = $('#request_type').val();

    $.ajax({
        url: 'https://dev-mydx.infomedia.co.id/process/data/download_attachment_template',
        enctype: 'multipart/form-data',
        data: {
          id: id,
          request_type: request_type,
          doc_type: doc_type,
          "app_token": "42f894028f0df72683fe3904cefcabad"
        },
        type: 'POST',
        dataType: 'json',
      })
      .done(function(data) {
        window.location.href = 'https://dev-mydx.infomedia.co.id/process/data/action_download_attachment_template/' + data.id + '/' + data.request_type + '/' + data.doc_type;
      });
  }

  if (0 == '1') {
    function load_attachment_value(flow_ticket_id, action_type) {
      $.ajax({
          url: 'https://dev-mydx.infomedia.co.id/process/data/get_attachment_value',
          enctype: 'multipart/form-data',
          data: {
            flow_node_id: flow_ticket_id,
            action_type: action_type,
            "app_token": "42f894028f0df72683fe3904cefcabad"
          },
          type: 'POST',
          dataType: 'json',
        })
        .done(function(data) {
          if (data.status == true) {
            var flow_node_id = $('#flow_node_id').val();
            var flow_ticket_id_escape = escape(flow_ticket_id).replaceAll('/', '_');
            var action_page = "view";
            // console.log(data);
            // $("#nav-tabs-attachments").empty(); $("#content-tabs-attachments").empty();
            // $("#text_process_name").html(data.process_name);

            $.each(data.request_type, function(index, value) {
              if ($.inArray(value.code, data.key_request_type) > -1) {
                if ($('#tab_import_attachments_' + value.code).length < 1) {
                  $('#nav-tabs-attachments').append(`<li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#tab_import_attachments_${value.code}" id="import-attachment-${value.code}" hidden><i class="fas fa-download"></i> Import ${value.name}</a>
              </li>`);

                  $('#tab_attachments').append(`
              <div class="tab-pane" id="tab_import_attachments_${value.code}">
              
              <button type='button' id='generateData' class='btn btn-primary'>Generate Data</button>

              <p>
              <div class="table-responsive">
              <table id="tbl_import_attachments_${value.code}" class="table table-bordered table-striped table-hover nowrap datatable">
              <thead class="thead-dark">
              <tr id="tr_import_attachments_${value.code}">
              <th>No</th>
              <th>Request Type</th>
              <th>Attachment ID</th>
              <th>Upload At</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
              </table>
              </div>
              </p>
              </div>`);
                }

                var tbl_import_attachments = eval('tbl_import_attachments_' + value.code);
                var tblLength = tbl_import_attachments.rows[0].cells.length;
                if (tblLength <= 4) {
                  var field = data.data;
                  $.each(field, function(index, values) {
                    if (values.request_type.includes(value.code)) {
                      $('#tr_import_attachments_' + value.code).append(`<th>${values.field_name}</th>`);
                    }
                  });
                  // console.log(content_title);
                  if (value.access_subticket == '1') {
                    $('#tr_import_attachments_' + value.code).append(`<th>Status Subticket</th>`);
                  }
                  if (value.access_subticket == '1' && data.access_subticket == '1' && action_page != 'view') {
                    $('#tr_import_attachments_' + value.code).append(`<th>Action</th>`);
                  }
                  load_datatable_attachments_value(value.code, flow_ticket_id, action_type);
                } else {
                  $('#tbl_import_attachments_' + value.code).DataTable().ajax.reload();
                }
              }
            });

            // $('#btn-import-attachment').removeAttr('hidden');
            // var tblLength = $( "#tbl_import_attachments tr th" ).length;
          }
        });
    }
  } else {
    function load_attachment_value(flow_ticket_id, action_type) {
      $.ajax({
          url: 'https://dev-mydx.infomedia.co.id/process/data/get_attachment_value',
          enctype: 'multipart/form-data',
          data: {
            flow_node_id: flow_ticket_id,
            action_type: action_type,
            "app_token": "42f894028f0df72683fe3904cefcabad"
          },
          type: 'POST',
          dataType: 'json',
        })
        .done(function(data) {
          if (data.status == true) {
            var flow_node_id = $('#flow_node_id').val();
            var flow_ticket_id_escape = escape(flow_ticket_id).replaceAll('/', '_');
            var action_page = "view";
            // console.log(data);
            // $("#nav-tabs-attachments").empty(); $("#content-tabs-attachments").empty();
            // $("#text_process_name").html(data.process_name);

            $.each(data.request_type, function(index, value) {
              if ($.inArray(value.code, data.key_request_type) > -1) {
                if ($('#tab_import_attachments_' + value.code).length < 1) {
                  $('#nav-tabs-attachments').append(`<li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#tab_import_attachments_${value.code}" id="import-attachment-${value.code}" hidden><i class="fas fa-download"></i> Import ${value.name}</a>
              </li>`);

                  $('#tab_attachments').append(`
              <div class="tab-pane" id="tab_import_attachments_${value.code}">
              <a href="https://dev-mydx.infomedia.co.id/process/data/action_download_attachment_template/${flow_node_id}/${value.code}/export/${flow_ticket_id_escape}" type="button" class="btn btn-outline-success btn-md">
              <i class="fas fa-file-excel"></i> Export as Template Data
              </a>
              <p>
              <div class="table-responsive">
              <table id="tbl_import_attachments_${value.code}" class="table table-bordered table-striped table-hover nowrap datatable">
              <thead class="thead-dark">
              <tr id="tr_import_attachments_${value.code}">
              <th>No</th>
              <th>Request Type</th>
              <th>Attachment ID</th>
              <th>Upload At</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
              </table>
              </div>
              </p>
              </div>`);
                }

                var tbl_import_attachments = eval('tbl_import_attachments_' + value.code);
                var tblLength = tbl_import_attachments.rows[0].cells.length;
                if (tblLength <= 4) {
                  var field = data.data;
                  $.each(field, function(index, values) {
                    if (values.request_type.includes(value.code)) {
                      $('#tr_import_attachments_' + value.code).append(`<th>${values.field_name}</th>`);
                    }
                  });
                  // console.log(content_title);
                  if (value.access_subticket == '1') {
                    $('#tr_import_attachments_' + value.code).append(`<th>Status Subticket</th>`);
                  }
                  if (value.access_subticket == '1' && data.access_subticket == '1' && action_page != 'view') {
                    $('#tr_import_attachments_' + value.code).append(`<th>Action</th>`);
                  }
                  load_datatable_attachments_value(value.code, flow_ticket_id, action_type);
                } else {
                  $('#tbl_import_attachments_' + value.code).DataTable().ajax.reload();
                }
              }
            });

            // $('#btn-import-attachment').removeAttr('hidden');
            // var tblLength = $( "#tbl_import_attachments tr th" ).length;
          }
        });
    }
  }

  var refer_doc = $("#refer_doc").val();
  if (refer_doc !== "") {
    $('#refer_doc').on('change', function() {
      $('#list_doc_referdocument td').remove();
      var refer_doc = $("#refer_doc").val();
      $.ajax({
        url: 'https://dev-mydx.infomedia.co.id/process/data/get_data_refer_attachment',
        enctype: 'multipart/form-data',
        data: {
          flow_ticket_id: refer_doc,
          "app_token": "42f894028f0df72683fe3904cefcabad"
        },
        type: 'POST',
        dataType: 'json',

        success: function(resp) {
          //$('<tr>').html("<th>List Attachment</th><th>Check</th></tr>").appendTo('#list_doc_referdocument');
          $.each(resp.res, function(i, item) {
            $('<td id="' + resp.res[i].name + '">').show("slow");
            //$('<tr>').html("<td>" + resp[i].id + "</td><td>" + resp[i].name + "</td>").appendTo('#list_doc_referdocument');
            $('<tr>').html("<td id='" + resp.res[i].name + "' >" + resp.res[i].name + "</td><td><div class='col text-center'><button type='button' class='btn btn-primary'><a href='https://dev-mydx.infomedia.co.id/process/data/download_file/"+resp.res[i].id_encrypt+"'><i class='btn-primary link fas fa-file-download'></i></a></button></div></td><td style='text-align:center;'><div class='icheck-primary d-inline'><input type='checkbox' name='checklist_refer[" + resp.res[i].id + "]' value='" + resp.res[i].id + "' id='checklist_refer_" + resp.res[i].id + "'><label for='checklist_refer_" + resp.res[i].id + "'></label></div></td>").appendTo('#list_doc_referdocument');
          });
        },


      });

    });
  }


  function load_datatable_attachments_value(code, id, action_type) {
    var flow_node_code_escape_replace = escape(id).replaceAll('/', '_');
    $('#tbl_import_attachments_' + code).dataTable({
      dom: "<'row'<'col-sm-3'l><'col-sm-6 text-center'B><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
      orderCellsTop: true,
      fixedHeader: true,
      buttons: [{
          extend: 'copyHtml5',
          text: '<i class="fas fa-clipboard"></i>',
          className: 'btn btn-primary',
          titleAttr: 'Copy to Clipboard'
        },
        // {
        //   extend:    'excelExport',
        //   text:      '<i class="fas fa-file-excel"></i>',
        //   className: 'btn btn-success',
        //   titleAttr: 'Export to Excel'
        // },
        {
          extend: 'csvHtml5',
          text: '<i class="fas fa-file-csv"></i>',
          className: 'btn btn-warning',
          titleAttr: 'Export to CSV'
        }
      ],
      "processing": true,
      "serverSide": true,
      "order": [],
      "ajax": {
        "url": "https://dev-mydx.infomedia.co.id/process/data/list_attachments_value/" + code + '/' + action_type + '/' + flow_node_code_escape_replace,
        "data": {
          "app_token": "42f894028f0df72683fe3904cefcabad"
        },
        "type": "POST",
        "dataSrc": function(json) {
          if (json.recordsFiltered > 0) {
            $('#import-attachment-' + json.request_type).removeAttr('hidden');
          } else {
            $('#import-attachment-' + json.request_type).attr('hidden', 'true');
          }
          return json.data;
        }
      },
      "drawCallback": function(settings, json) {
        $('.create_ticket').on('click', function() {
          var attachments_id = $(this).data('attachments_id');
          var inputOptionsPromise = new Promise(function(resolve) {
            $.ajax({
                url: 'https://dev-mydx.infomedia.co.id/process/data/get_user',
                enctype: 'multipart/form-data',
                data: {
                  "attachments_id": attachments_id,
                  "app_token": "42f894028f0df72683fe3904cefcabad"
                },
                type: 'POST',
                dataType: 'json',
              })
              .done(function(data) {
                resolve(data)
              });
          })
          Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "Please select the user who will process?",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, process it!',
            input: 'select',
            inputOptions: inputOptionsPromise
          }).then((result) => {
            $('.preloader').fadeOut('fast');
            if (result.value) {
              $.ajax({
                  url: 'https://dev-mydx.infomedia.co.id/process/data/create_subticket',
                  enctype: 'multipart/form-data',
                  data: {
                    "id": $(this).data('id'),
                    "flow_request_id": $(this).data('flow_request_id'),
                    "node_id": 1710,
                    "app_token": "42f894028f0df72683fe3904cefcabad",
                    "code": $(this).data('code'),
                    "user_id": result.value
                  },
                  type: 'POST',
                  dataType: 'json',
                })
                .done(function(data) {
                  if (data.status == true) {
                    location.reload();
                  } else {
                    Swal.fire('Failed!', data.message, 'error');
                  }
                });
            }
          });
        });
      }
    });
  }

  function validation_submit(request_id, data) {
    return true;
  }


  // tombol generate data subticket 
  $(document).on('click', '#generateData', function() {
    var inputOptionsPromise = new Promise(function(resolve) {
      $.ajax({
          url: 'https://dev-mydx.infomedia.co.id/process/data/get_user_generate',
          enctype: 'multipart/form-data',
          data: {
            "process_id": "75",
            "app_token": "42f894028f0df72683fe3904cefcabad"
          },
          type: 'POST',
          dataType: 'json',
          beforeSend: function() {
            $("#generateData").prop('disabled', true);
          },
        })
        .done(function(data) {
          resolve(data)
        });
    })
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "Please select the user who will process?",
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, process it!',
      input: 'select',
      inputOptions: inputOptionsPromise
    }).then((result) => {
      if (result.value) {
        $.ajax({
            url: 'https://dev-mydx.infomedia.co.id/process/data/generate_data_subticket',
            enctype: 'multipart/form-data',
            data: {
              "process_id": "75",
              "flow_request": "NjY3YjM5NGZjMzdkMjMwZGIxYjEyZjk5MWE4ZmY1NzkzNDcwMjA5NGI0YzRmNjEyYTUxYzhjOWFlMTJlODU4NWYyMDEyZDBiY2U5Mzc0ZTRjY2I2YjlkNWUxZTRkMWFiYmFlMzRmNTk3NGNkMzY4OTZlNmNhM2YxOTVlZTNkOGRjdUZPSWIwNWZQeTcxRE9Cdk1iN1lJUkg1WDBzMUF6bjNUU1VLTHJHR0pJPQ==",
              "user_id": result.value,
              "app_token": "42f894028f0df72683fe3904cefcabad"
            },
            type: 'POST',
            dataType: 'json',
          })
          .done(function(data) {
            $('.preloader').fadeOut('fast');
            $("#generateData").prop('disabled', false);
            if (data.status == true) {
              Swal.fire({
                type: 'success',
                title: 'Success',
                text: data.message,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              }).then(function() {
                $('#tbl_import_attachments_myd_my_citra').DataTable().ajax.reload();
              })
            }

          });
      }
    });

  });

  // get html
  function getDocHTML(flow_request_id) {
    $.ajax({
        url: 'https://dev-mydx.infomedia.co.id/process/data/getDocHTML/' + flow_request_id + '/' + '1710',
        type: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#view-doc").html(data);
      });
  }

  /*
  function get_process_menus() {
    $.ajax({
        url: 'https://dev-mydx.infomedia.co.id/process/data/get_process_menus',
        enctype: 'multipart/form-data',
        data: {"app_token":"42f894028f0df72683fe3904cefcabad"},
        type: 'POST',
        dataType: 'json',
    })
    .done(function(data) {
        if(data.status==true){
            $("#get_process_menu").html(data.process_menu);        
        }else{
            $("#get_process_menu").html(data.process_menu);        
        }
    });
  }
  */

  if ('null' == '0' || 'null' == '2' && 'null' == 0 || 'null' == '3' && 'null' == 0) {
    $('#datagrid').remove();
    $('#option_information_datagrid').remove();
    $("#datagrid th:last-child, #datagrid td:last-child").remove();
  }

  //$('#process_action').on('change', function() {
  $('#process_action').change(function() {

    var str = $('select[id="process_action"] option:selected').text();

    if (str == 'Return' || str == 'Return Direct') {
      $('.custom_input_text:contains(*)').find('input').prop('disabled', true);
      //$('#option_information').find('input').prop('disabled', true); 
      $('#request_date,#requester_company,#request_by,#current_position').prop('disabled', true);
      $('.custom_input_text:contains(*)').find('select').prop('disabled', true);
      $('#validasicheck div input').removeAttr('required');
      //$('.validasichecknode').attr('disabled', true);
      $('.required_checklist').removeAttr('required');
    } else {
      $('.custom_input_text:contains(*)').find('input').prop('disabled', false);
      //$('#option_information').find('input').prop('disabled', false); 
      $('#request_date,#requester_company,#request_by,#current_position').prop('disabled', true);
      $('.custom_input_text:contains(*)').find('select').prop('disabled', false);
      $('#validasicheck div input').attr('required', '');
      //$('.validasichecknode').removeAttr('disabled');
      $('.required_checklist').attr('required', true);
    }

  });
</script>