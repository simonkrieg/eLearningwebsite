import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TeamMember } from '../lib/supabase';
import { mapSections, pageText, type PageSections } from '../lib/pages';
import { PageHero } from '../components/PageHero';

const VALUES = [
  { title: 'Contextualised Content', desc: 'We design every course around your industry, your terminology, and your real-world scenarios — not generic templates.' },
  { title: 'Affordable Solutions', desc: 'Quality eLearning shouldn\'t break the budget. We offer competitive pricing without compromising on pedagogical rigour.' },
  { title: 'Applied Learning', desc: 'Our courses are designed for immediate application on the job, bridging the gap between theory and workplace practice.' },
  { title: 'Ongoing Partnership', desc: 'We stay with you after launch — refining content, tracking outcomes, and evolving your learning system as your needs change.' },
];

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [sections, setSections] = useState<PageSections>({});

  useEffect(() => {
    supabase.from('pages').select('*').eq('page', 'about').then(({ data }) => setSections(mapSections(data)));
    supabase.from('team_members').select('*').eq('is_published', true).order('sort_order').then(({ data }) => { if (data) setTeam(data); });
  }, []);

  const hero = sections.hero;
  const story = sections.story;
  const cta = sections.cta;

  return (
    <div className="pt-16">
      {/* Hero */}
      <PageHero
        section={hero}
        subtitleFallback="About Us"
        titleFallback="Adelaide's eLearning specialists"
        bodyFallback="We are based in Adelaide, South Australia and we provide affordable solutions to online education. We specialise in developing targeted and contextualised online content and learning systems for a variety of industry settings."
        imageFallback="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">{pageText(story, 'subtitle', 'Our Story')}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{pageText(story, 'title', 'Built on a belief that good training changes organisations')}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed whitespace-pre-line">
                {pageText(story, 'body', "E-Learning Creations was founded on a simple premise: Australian organisations deserve access to high-quality, contextualised online learning that doesn't cost a fortune.\n\nWe noticed that most eLearning providers offered generic, one-size-fits-all content that failed to resonate with learners. Completion rates were low. Knowledge transfer was poor. Training dollars were wasted.\n\nWe set out to do things differently, working closely with each client to understand their industry, their culture, and their specific learning objectives before a single line of content is written.")}
              </div>
              <Link to={pageText(story, 'cta_url', '/contact')} className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-colors group">
                {pageText(story, 'cta_label', 'Work with us')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 bg-sky-600 text-white rounded-2xl p-6 shadow-xl hidden md:block">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm text-sky-100 mt-1">Years of expertise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">What We Stand For</p>
            <h2 className="text-3xl font-bold text-gray-900">Our principles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(({ title, desc }) => (
              <div key={title} className="bg-white p-7 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">The Team</p>
              <h2 className="text-3xl font-bold text-gray-900">People behind E-Learning Creations</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {team.map(member => (
                <div key={member.id} className="max-w-xs w-full text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 border-4 border-sky-50 shadow-lg">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-2xl">
                        {member.name[0]}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                  <p className="text-sky-600 text-sm font-medium mb-3">{member.role}</p>
                  {member.bio && <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>}
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-sm text-gray-400 hover:text-sky-600 transition-colors">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-sky-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{pageText(cta, 'title', "Let's build something great together")}</h2>
          <p className="text-sky-100 text-lg mb-8">{pageText(cta, 'body', "Ready to transform how your organisation learns? We'd love to hear about your project.")}</p>
          <Link to={pageText(cta, 'cta_url', '/contact')} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-700 font-bold rounded-xl hover:bg-sky-50 transition-colors group">
            {pageText(cta, 'cta_label', 'Get in touch')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
