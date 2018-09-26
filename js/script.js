Vue.component('note', {
    props: ['todo'],
    template: `
    <div class="ui card">
        <div class="content">
            <div class="header">{{titleLnegth || '新建笔记'}}</div>
            <div class="meta">
                <span>{{createDate}}</span>
                <span>{{todo.title.length}}字</span>
            </div>
            <textarea rows="5" v-model="todo.title" @keyup="uploadNte"></textarea>
            <i class="trash icon" title="删除笔记" @click="del"></i>
        </div>
    </div>
    `,
    computed: {
        //计算标题的限制长度
        titleLnegth: function () {
            return _.truncate(this.todo.title, {'length': 24})
        },
        //计算当前的时间
        createDate: function () {
            return moment(this.todo.time).fromNow();
        },
        //获取当前的时间戳
        getDate: function () {
            return Date.parse(new Date());
        }
    },
    methods: {
        del: function () {
            //console.log(this._uid-1)
            app.notes.splice(this._uid - 1, 1);

            //把当前的数组数据存放到本地存储里面
            localStorage.setItem('notes', JSON.stringify(app.notes))

        },
        uploadNte: function () {
            //console.log(this.todo.title)
            //console.log(this._uid-1)
            //修改内容
            app.notes[this._uid - 1].title = this.todo.title
            //修改时间戳
            app.notes[this._uid - 1].time = this.getDate


            //把当前的数组数据存放到本地存储里面
            localStorage.setItem('notes', JSON.stringify(app.notes))

        }
    }
})


var app = new Vue({
    el: "#app",
    data: {
        notes: [
            {
                "title": "Hello",
                "time": 1537750568000
            },
            {
                "title": "君不见，黄河之水天上来，奔流到海不复回。 君不见，高堂明镜悲白发，朝如青丝暮成雪。 人生得意须尽欢，莫使金樽空对月。 天生我材必有用，千金散尽还复来。 烹羊宰牛且为乐，会须一饮三百杯。 岑夫子，丹丘生，将进酒，杯莫停。 与君歌一曲，请君为我倾耳听。(倾耳听 一作：侧耳听) 钟鼓馔玉不足贵，但愿长醉不复醒。(不足贵 一作：何足贵；不复醒 一作：不愿醒/不用醒) 古来圣贤皆寂寞，惟有饮者留其名。(古来 一作：自古；惟 通：唯) 陈王昔时宴平乐，斗酒十千恣欢谑。 主人何为言少钱，径须沽取对君酌。 五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。",
                "time": 1537750568000
            },
            {
                "title": "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
                "time": 1537751568000
            },
            {
                "title": "故人西辞黄鹤楼，烟花三月下扬州。 孤帆远影碧空尽，唯见长江天际流。 (唯 通：惟)",
                "time": 1537741568000
            }
        ]
    },
    methods: {
        add: function () {
            this.notes.unshift({"title": "", "time": Date.parse(new Date())})


            //把当前的数组数据存放到本地存储里面
            localStorage.setItem('notes', JSON.stringify(this.notes))
            //取值
            console.log(JSON.parse(localStorage.getItem('notes')))

            //光标放到新添加的这个输入框里
            if (document.querySelector("textarea") !== null) {
                document.querySelector("textarea").focus();
            }
        }
    },
    created: function () {
        //如果本地存储里面没有值，就用默认的 notes 数组里面的值
        if (localStorage.getItem('notes') !== null) {
            //把本地存储里面的值赋值给notes
            this.notes = JSON.parse(localStorage.getItem('notes'))
        }
    }
})


//多行文本框内容自动适应
autosize(document.querySelectorAll('textarea'));
