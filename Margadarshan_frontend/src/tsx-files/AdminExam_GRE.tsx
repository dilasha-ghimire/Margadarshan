import AdminExam from './AdminExam';
import "../css-files/AdminExam.css"
function AdminExam_GRE(){
    return (
        <>
        <AdminExam/>
        <div className="adminExam_main">
          <form >
            <div className="Ani">
              <div className="Rasu">
                <label className="andminExam_Text">GRE Test Dates</label>
                <input type="text" />
                <label className="andminExam_Text">Registration Deadline</label>
                <input type="text" />
                <label className="andminExam_Text">Late Registration Deadline</label>
                <input type="text"/>
              </div>
              <button
                className="ExamAdmin_UploadButton"
                type="submit">
                  Upload
              </button>
            </div>
          </form>
        </div>
        </>
    )
}
export default AdminExam_GRE;