//codigo generico para validaçao de formulários
// nao pode haver butao submit tem de haver um item type="button" com o ID submit e um com o ID update, para inserir e update dos mesmos
// o form tem de ter um ID
$(document).ready(function()
{
        $('#submiti').click(function()
        {
                var form = $(this).parents('form:first');
                var formName = "#"+form[0].name;
                var err = 0;
                $(formName +' :input').each(function()
                {

                        if ($(this).attr("type") != "checkbox" && $(this).attr("alt") == "req" )
                        {
                                if($(this).val() == "" || $(this).val() == "*")
                                {
                                        err = err + 1;
                                                loadPopup();
                                                centerPopup();

                                        $(this).css({'color' : '#0099FF'});
                                         $(this).val("*");
                                        $(this).focus(function(){
                                                if($(this).val() == "*")
                                                {
                                                         $(this).val("");
                                                        $(this).css({'color' : '#000000'});
                                                }
                                        });

                                }
                                        if($(this).attr("class") == "email")
                                                if(!isValidEmailAddress($(this).val()))
                                                        err = err +1;
                        }


                        if($(this).attr("class") == "email2")
                                if( $(this).val() != "")
                                        if(!isValidEmailAddress($(this).val()))
                                                err = err +1;
                });
                if(err == 0)
                {
                        $(formName).trigger("submit");
                                sucessShowLoader();
                }
        });

        $('#update').click(function()
        {
                var form = $(this).parents('form:first');
                var formName = "#"+form[0].name;
                var err = 0;
                $(formName +' :input').each(function()
                {
                        if ($(this).attr("type") != "checkbox" && $(this).attr("alt") == "req" )
                        {
                                if($(this).val() == "" || $(this).val() == "*")
                                {
                                        err = err + 1;
                                                loadPopup();
                                                centerPopup();

                                        $(this).css({'color' : '#0099FF'});
                                         $(this).val("*");
                                        $(this).focus(function(){
                                                if($(this).val() == "*")
                                                {
                                                         $(this).val("");
                                                        $(this).css({'color' : '#000000'});
                                                }
                                        });

                                }
                                        if($(this).attr("class") == "email")
                                                if(!isValidEmailAddress($(this).val()))
                                                        err = err +1;
                        }


                        if($(this).attr("class") == "email2")
                                if( $(this).val() != "")
                                        if(!isValidEmailAddress($(this).val()))
                                        {
                                                err = err +1;
                                                $(".validEmail2").css({
                                                        "background-image": "url('validNo.png')"
                                                });
                                        }

                });
                if(err == 0)
                {
                        $(formName).trigger("submit");
                }
        });


        $(".email").keyup(function(){
                                var email = $(".email").val();

                                if(email != 0)
                                {
                                        if(isValidEmailAddress(email))
                                        {
                                                $(".validEmail").css({
                                                        "background-image": "url('validYes.png')"
                                                });
                                        } else {
                                                $(".validEmail").css({
                                                        "background-image": "url('validNo.png')"
                                                });
                                        }
                                } else {
                                        $(".validEmail").css({
                                                "background-image": "none"
                                        });
                                }

                        });

                        $(".email2").keyup(function(){
                                                var emails = $(".email2").val();
                                                if(emails != 0)
                                                {
                                                        if(isValidEmailAddress(emails))
                                                        {
                                                                $(".validEmail2").css({
                                                                        "background-image": "url('validYes.png')"
                                                                });
                                                        } else {
                                                                $(".validEmail2").css({
                                                                        "background-image": "url('validNo.png')"
                                                                });
                                                        }
                                                } else {
                                                        $(".validEmail2").css({
                                                                "background-image": "none"
                                                        });
                                                }

                                        });

        function sucessShowLoader(){
        
                var windowWidth = document.documentElement.clientWidth;
                var windowHeight = document.documentElement.clientHeight;
                $("#backgroundPopup").css({
                        "opacity": "0.7"
                });
                $("#backgroundPopup").fadeIn("slow");


                //centering
                $("#popupLoader").css({
                "position": "absolute",
                "top": windowHeight/2-16,
                "left": windowWidth/2-16,
                "display":"visible"
                });
                $("#popupLoader").fadeIn("slow");
                $(document).scrollTop(0);

        }



                function isValidEmailAddress(emailAddress) {
                         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                         return pattern.test(emailAddress);
                }



});