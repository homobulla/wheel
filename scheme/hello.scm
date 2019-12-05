;The first program
(begin 
( "hello,world"
)(
	newline
))
; 布尔值
(boolean? #t) ;true
(boolean? "hello") ;false
(not #f) ;true
(not "hello") ;#f 类型转换和js一样


(max 1 20 33) ; 33
(string-append "E "
               "Pluribus "
               "Unum") ; E Pluribus Unum
(set-cdr! x #f)
