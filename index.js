import reddit from './reddit-api';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit',e=>{
    const searchTerm = searchInput.value;
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    console.log(sortBy);
    const searchLimit=document.getElementById('limit').value;
    console.log(searchLimit);


    //check input

    if(searchTerm===''){
        showMessage('Please add a search term','alert-danger');
    }



    searchInput.value='';



    reddit.search(searchTerm,searchLimit,sortBy).then(results => {
        console.log(results);
        let output='<div class = "card-columns">';
        results.forEach(post=>{


            let image=post.preview ? post.preview.images[0].source.url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAACpCAMAAABEdevhAAAAt1BMVEX///8AAAD/RQDZ2dlvb2/Ozs54eHjFxcVQUFCysrL39/fk5OR/f38LCwu2trZYWFg5OTn5+fnw8PDs7OzGxsZBQUHW1tZoaGicnJykpKQpKSlISEiLi4uWlpbh4eG9vb0dHR2Ojo5XV1cUFBRjY2MbGxslJSWhoaE7OzsxMTH/MwD/MQD/8u3/5Nv/uqX/s5z/zr7/lXn/Xin/183/n4T/i2f/g2D/eVf/UBH/6OH/qJH/dk//vqrpvMqRAAAOT0lEQVR4nO1da2OiuBo2VVAuokBFUUDxbmc6s3M5uzvn7P//XSchFxIIkVqtnW2eL1UMmDy897zYTkdDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0Pjt0AQRc695/B7IBsAiPnjvefxDhHswWY6M3z63gIE7j1n9T5BuRnNogC+7cOXK9Mdwz/pvaf27tCD+kZFaeF6CyhQSMYQhdm95/bOEECGOt14Oh5Swrb4gwSA2X2n9u7gAZCgv3726C4Kvjz8gc1Y0yCYAlB6PKcPfaBB3gAwuM+U3iuCDZgH3PsUAIt8AsD0LlN6tzAAMPn3EQBr/MrU9qqCpNQ5DKiEZgjN1wxaLh28C6ioYCFoYDXanuCf+E5zeqcw6kZpSWMHHYqKSJgpLxGaiKm1DkQrOIFhWD/qZ5n99nN553BgGnjvOfwumLEoXeMc5mCozZIaYdfKzcG+yP5W462b9rPg/FkfD4FlTkAdq3Velvs0IEKvR8kZ7k+TxWAxOZ529NAp+eh0BSHVL8fFtGzWyTLKQtuGzPh2EHaNuEdkbRLbtdM+Cpx8MB+eRge47q6JS5/JoySigiGV1SvKo6cZZCtM1/C09Uw28t8KixY75/1ZIVFmptAye1ns4IyN5YpaseXbzfXOKPjZmgOy8v3hrJxEJjVeI3MNPlD+jLJgVF/pZIWc5K3ylm5B0QKd5kzhq+5t5/hO4C9otQ4Jy6h1MWqJFBcrX/5R6sgR3VzYvrDAEiKlLcoPPnSP0S3m9t6QEOmYMjFpDRSFFTsW8QexWFO8GYoMvHF2cAUu2UnNyI7Yvx2YK1QT7vOHn798/aMWOHz+4+uXZ/4A1NtJ5+Nw5RYkjSu26tsTxPdnceiP7+joT/7QCYBDsVN/uP1M7w8oUT202AV/8D9PDwV+8Qef8bGnb9yxLkAl08EF+vs7wj5CbzYWHdmPT4SWP/mRfz2Qoz+4gzDQOEDTPvkY6TTuFhLE6hsRq4e/P5cHfz1Qrv7LDQ0B2F3iFn5TuFwrB8aflJYHjqtnSqBosUb32Piyo377TCF7NMSs7TXFkRSuVjjwUy1XX/mxMNgY1jbEbgwD9citW5Y3kCisyvDPt9b7zX4QX7oFdQJz4T0VIcGMM4P/ILjHx0qrwxugS6porWwkKVtSvYlouXd8mdkIVtV87mdh3J++f+YP/vr7qS5WaOK9i771ckzJctvkChmt5mI56nIF8YvagsNNrd/s68PT06e/fokHn//36enp4Z/aZN64Wc2notGmrbdPmSmKAv6G4wpcoob+XnSDCJ//+fKjPvLHl38+Vw5Fby5X9pistc33epSYwhekxWmZ77htua7hBDaXnFZg+eb5zSu4OjGGclB1aC0BDcDFXjSvJJK3x+VcBfDvEK/UR9sGXPwdTU/HXpsd4/gVzXlHMHzjZrXLuUKW/Ug+GAjVAjKshW+E9vlSJYzevg/5cq4c+JdGRxOeGnuPB81bhCEDSYNVOyzevi/kcq78UnYM5hsRuvyoM4DSsbkokIVTGV9y3mvwCtuOErIdehWia5zYKIOOahNzTWstVt5aIi/xWiwzZy0vf1W8givMSS/vVYhhXLVxU8hD5MIR6F6TSsaF2h6FZCiYv32C8yqu0O4CA3f6i7gqRgtkoQL8Zrp0iLWzHW+Ldrl4sxZO7lK4eg1XuKiCz+Zm/jKuUNyAH91iB3A+MNlOe9PpFs9vxetldgRgf4dehldx1bHw2SchmXwhVwVZaz5UcnL2FBzGOOWZ8SCXq3s8B/A6rjp2ZKVWVG/XfwlXxWVXAt32MtlOdlD1hqvFNOnzntJBu9STu3TIvJIrGV7MVSdC6dKiErv6dgBhi2YpOCDbZd6nyH5Lrto7dbuwfItzwWWYojB3o9yljqwlEzp7mc5kkzC8Q5Jy4xqRLQ95knokfVNzZRtWmqRxn1xVwlVgubGggo7DRllOe6tiFLWhfdp8F4I+Dk5MVezqF2NwjhkkRXvXQExMA2vAHnGdJ6qb3s1PdODORXQpuPKxsy6wsNAM61wZe0HZshE7A2M4bU1XH89k7y4lGuZYI3xBU3094plRgPFIy2t77l76pjg/sGhiyxmJA9ehgqu4suxYwpVN3pNbF4I6TtXrNuNxS1e3TeKl0c0cpxs9WjNzQY5v8jPMs8KtX/42AV/K4A4yyI1fWh/odY5yrrJjbezIZs9YUa5i8p5sPSW1c8BLGlmik+x8CiQm2zMmhhZud4HHncmSKOn8wFhyAwaygSmtIYtcLWVjJ+y2UK6oRJPZjGRntS6YFvpjBst0sKteY96LjU7xSm3+6QRXB/5sujTp9BCq1aNAedMqXMXqsTWuyG5MTza2baEXmxoshVnfSs3edgRDd3fmGdjgHM+TRbkSzQeR7ClowkY0Wr5Uqhq48s6MbeKqrxp7BshADJQxWQ9skEFTRSIyewQm2HG6ss8oWYJuS295A1fOubFNXMnksWXPT9GHlSpbGuFiI2hxxooKvYSrPenZ5e7/0fWMbtQ/cDrJl1j5Oz6NjW7XmFUEjeNqUR49JsuoG3nuvh1XnW6c5+y29PJk1radc4DcVaL83ZPiOfGt0gBWuVpt+4TZkPbEg73FHF9WslXe0qBMRsuHXx8FC1ZyxdnFmF42EF1II1cIER31gs3oZXENU7mtkyL9y4bSR1UJRK5MLjJnGjgSzp6xwYzAcqX8TQl4a8e4Csq7wgvFkreXSq5eng92Ouuiv3ar3Dk7FFdMVFEIz5XwC1msrj2oRFOMLFpDC5gAisVEfy3hKmeHRP3hw4hrc+Xg2t1AyVVcOEFnqOhp57g6CVETFatdTW6ZvJDUiWnVuJJLhaVuUq5stvNe3WAp5fXqXPVxODtRcuVhiRooFLXkaii434Da27pI0lCfLNdnMXjN35YXp1wxf1HffSsfgrw2VwkW4lZcuYp2+HI5qfS4bDOSCtZCnHz9ofSSRsoVU8t6HFPO5NpcmXgPWa2DFr73qv5/NkMxYGIRu2yTm023kFamPJKYl4kR4YqpoKz2z8z7tbka4WLA6Jy9QgK1VHQ+Mq5EpQjpxGURDIsRCiWk6TuQONuQckO4eqRjZalJfiOu/Am2pD3Oddcxw7JuKNImxpWopWxR0qtTehADzAtKN2oH3MgOV4uQBUeMhWvL1RbLlSm9nRQ5nlQruRJnT9OJnfQk6iMn/NylLSl0JOGKmqu5zNew0OtG9ipRZo8upsBqY6/Ey9A1niKjjojmGXubM0nSOJpennBFbb08hllVpnJlPzhTPvE1xYS28YOVbqPmCgOPTcAltNKiIl0Z5sqmeY/8991o1HCj+MpTVgYneJ++TXxV4YpLcFUIORMktWw0e8NcsaBNnqBS33v1uH1Y+F1DmRhji+KonkWVc2ULja3NcLi0UXp5milhrphblJtPKsw3ygcz5TO5OBJolQ+KXJUZrhI7u1zQUHp5kSuHRiLy1sSbcbUsfrPQrrTDVCcKha5dneEirlCuzIoM0suL9orJVS4dTBX/6lzh+hXqJ2okAsfrW2VRukEHK+0RckyRiVLbK1o+qNgr+YSo5b8+V+gkD93WxhLxFvlKt57/82iw7TSGnLuNSHGQwPygtOZIaxBt/KBPN1iuz1VxR62+whhtwC5EprdNvb3CFY2gJmdnwSJ8aVhCl0viK3oLas8zILBC/A24Kq41aG4uDgFYTUDbfRyRK5YQn50EW6HMBvmV/UG6+pXMbtT2Uq/JFbGrm4aMkHx3u/3BClfiszEq2DQW30s+ZI6PcMUUVrbQ/KZckeaIhqC8cMHnfh2kgSsmLee7vFm/g6QkwSgnXLHCtEwXWCn6NlxB4Vk0NTehDvHe2U2hBq7UlkWcAZ28RAnZzhedIjXum/otLDfObsUVCjjnUj/ntWo8buKKMdAgtF03IY7PoUHTsJZIMbvPuMrpgXrkXu6m3Y4rt8HRjVq1vjVxxep5K9mNCIplkMoCy7Nr2VaZVVKumBLWBIvbyLkdV5FcURxVRF+iiStue7B+koEjIRJQsNlXp8/tkDIzweirpGZZOfZWXPld77CTChBc69RannVjjVwx1QKDioO3GQfEAbMq8kYwj3xDFuOKbRuLUpjxicJNuMryfWUq5VLJFRex+nHDRq64Tou9xV0jjMvNd7syfRgbl7v5QgmsnCAjFmzZV/qeUNe4BVfcPmitKFl2Lo6VbTfNXPncr5bOXSMM7CB0rC3X6cUaEDllO8YOGvhY6ZwpueI7GadRaNtBdqj8PuoNuEKx9ao3sw5wXseKBYYOeJfEcbqVEtmKK15cCr6Op0qPJ4u9fGGxu2M98+YEX2zqO41XtcHX5wo5ZBcrx7rqg4Mx3RXuDtr1FMmeWJX2ZpXgigVZfcGNXDX0Vd6Uq21ZMkNOxKp8Rv4hR8feKn8XRcWVmiyhXpedKaQKBvUcWVfnSqgMz8RzTX7tMKQ5Nu8hUo3YSKtg0ibYAqeKYjtj2agVlTcxKpa0LEMwRabVHRq2yLl6wcOQfeHOFvUZ8tqGHmjIee+Bqi5Kg0N57I9/FbGOjVVj35d0TE5CGoxXJNuQ6GxMw4kVNRnUEwtEs0z1Bb+9Drk6jhiKJR0XBVAcsV+Xn+1VXNHUojEd8uqt6KtUSqxR5bVnMy2uLsyuidaSJYvMDmbSk0k0+5LH3LPqlylwUuzj4yYp1XOYhrhZOG0W/i7/jMW6EG0sbRLb4luc89yl6PuxyHC9cTifrNQysSao/FUd1Wc/FFA+eO9brnvuyfyuN0tc000OyzM90jCPSHPXzQ+PdC1Gbs4asofQOOSJmaQee6gkdhMhV8/SXlorlQQHN9H/KEJDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0ND4+Ph/0WowrtENH+QAAAAAElFTkSuQmCC';



            output+=`
            <div class="card">
  <img class="card-img-top" src="${image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext,100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Open in reddit</a>
  
    <hr> <span class="badge badge-secondary"> Subreddit: ${post.subreddit} </span>
    </div>
</div>
         `
        })
        output+='</div>';
        document.getElementById('results').innerHTML=output;
    });

    e.preventDefault();



});


function showMessage(message,className){
    const div = document.createElement('div');
    div.className=`alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const searchContainer = document.getElementById('search-container');
    const search = document.getElementById('search');

    searchContainer.insertBefore(div,search);

    setTimeout(()=>document.querySelector('.alert').remove(),3000);
}



//minimize text in indexhtml

function truncateText(text,limit){
    const shortened=text.indexOf(' ',limit);
    if(shortened==-1) return text;
    return text.substring(0,shortened);
}