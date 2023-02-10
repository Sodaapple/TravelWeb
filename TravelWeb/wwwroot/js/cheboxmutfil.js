


var $filterCheckboxes = $('input[type="checkbox"]'); //輸入類型是是checkbox的
var filterFunc = function() {  //定義filterFunc他是一個function
  
  var selectedFilters = {};  ////selectedFilters他是一個空集合

  $filterCheckboxes.filter(':checked').each(function() { // checkbox被check的時候，每個執行function

    if (!selectedFilters.hasOwnProperty(this.name)) { //當空集合是用來判斷屬性或對象是this.name的
      selectedFilters[this.name] = [];      //當空集合是用來判斷屬性或對象是this.name把它變空集合
    }

    selectedFilters[this.name].push(this.value);  //當空集合是用來判斷屬性或對象是this.name 新增this.value元素
  });

  // create a collection containing all of the filterable elements
  var $filteredResults = $('.flower');  //篩選出來的class是flower的

  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function(name, filterValues) {  //每個selectedFilters空集合，應用到新的filterValues

    // filter each .flower element
    $filteredResults = $filteredResults.filter(function() {  //篩選出來的class是flower的

      var matched = false, 
        currentFilterValues = $(this).data('category').split(' '); //把所有category分開來 分別為currentFilterValues

      // loop over each category value in the current .flower's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {

        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .flower element is returned
      return matched;

    });
  });

  $('.flower').hide().filter($filteredResults).show();
}

$filterCheckboxes.on('change', filterFunc);  

function doncheck(){
  
  $("input[type='checkbox']").prop("checked",false);
  
  $('.flower').show();

}
