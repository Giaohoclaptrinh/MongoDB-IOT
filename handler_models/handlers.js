class handlers {
  home(req, res) {
    res.render("home");
  }
}
const handle = new handlers();
export default handle;
