function checkRequiredErrorMessage(data, elementId){
    if(!data){
        let span = document.getElementById(elementId);
        span.innerText = 'Boş bırakılamaz';
        span.style.display = 'block'
        return false;
      }
      return true;
}