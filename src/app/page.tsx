import Wiki from "@/app/components/wiki/Wiki";

const DUMMY_DATA: Wiki[] = [
  {id: (new Date().getMilliseconds() % (Math.random() * 100)).toString(), index: 0, title: '자바고급', content: ''},
  {id: (new Date().getMilliseconds() % (Math.random() * 100)).toString(), index: 1, title: '도커 기반 어플리케이션 패키징', content: ''},
  {id: (new Date().getMilliseconds() % (Math.random() * 100)).toString(), index: 2, title: '인터 커뮤니케이션', content: ''},
  {id: (new Date().getMilliseconds() % (Math.random() * 100)).toString(), index: 3, title: '데이터 분석', content: ''},
  {id: (new Date().getMilliseconds() % (Math.random() * 100)).toString(), index: 4, title: '서비스 메시', content: ''},
]

export default function Home() {
  return (
    <div>
      <Wiki>
        {DUMMY_DATA.map(data => <Wiki.Row key={data.id} data={data} />)}
      </Wiki>
    </div>
  );
}
