namespace db;
entity college
{
    key c_id : Integer;
    c_name : String;
    col_lec_rel : Composition of many lecture on col_lec_rel.c_id = c_id;
}
entity lecture{
    key l_id : Integer;
    l_name : String;
     c_id : Integer;
     lec : Association to one college on lec.c_id = c_id;
}