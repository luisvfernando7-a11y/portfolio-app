import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  StatusBar,
  Linking,
} from 'react-native';

// ─── DESIGN TOKENS ───────────────────────────────────────
const C = {
  bg:          '#0A0F18',
  bg2:         '#0E1520',
  surface:     '#131C2B',
  surfaceAlt:  '#162035',
  border:      '#1E2D42',
  borderLight: '#243348',
  gold:        '#B8944A',
  goldMuted:   '#8A6E38',
  goldFaint:   'rgba(184,148,74,0.10)',
  blue:        '#3A6EA8',
  blueFaint:   'rgba(58,110,168,0.12)',
  text:        '#D4DCE8',
  textSub:     '#8A9BB0',
  textMuted:   '#4A5B6E',
  accent:      '#4A8FD4',
  success:     '#3D9E6A',
};

const W = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
};

// ─── INTRO SCREEN ────────────────────────────────────────
function IntroScreen({ onEnter }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;
  const barAnim   = useRef(new Animated.Value(0)).current;
  const btnFade   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.delay(400),
      Animated.timing(barAnim, { toValue: 1, duration: 1100, useNativeDriver: false }),
    ]).start(() => {
      Animated.timing(btnFade, { toValue: 1, duration: 350, useNativeDriver: true }).start();
    });
  }, []);

  return (
    <View style={intro.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        alignItems: 'center',
        gap: 8,
      }}>
        <Text style={intro.name}>Luis Fernando Vieira</Text>
        <Text style={intro.role}>Backend Developer  ·  ML Engineer</Text>
      </Animated.View>

      <View style={intro.loaderWrap}>
        <View style={intro.loaderBg}>
          <Animated.View style={[intro.loaderFill, {
            width: barAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          }]} />
        </View>
      </View>

      <Animated.View style={{ opacity: btnFade }}>
        <TouchableOpacity style={intro.btn} onPress={onEnter} activeOpacity={0.75}>
          <Text style={intro.btnText}>Acessar portfólio</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const intro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 52,
    padding: 40,
  },
  name: {
    fontSize: 26,
    fontWeight: W.bold,
    color: C.text,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  role: {
    fontSize: 13,
    fontWeight: W.regular,
    color: C.textSub,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  loaderWrap: { width: 100 },
  loaderBg: {
    height: 2,
    backgroundColor: C.border,
    borderRadius: 1,
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    backgroundColor: C.gold,
    borderRadius: 1,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.borderLight,
  },
  btnText: {
    fontSize: 14,
    fontWeight: W.medium,
    color: C.text,
    letterSpacing: 0.1,
  },
});

// ─── HELPERS ─────────────────────────────────────────────
const Divider = () => (
  <View style={{ height: 1, backgroundColor: C.border, marginVertical: 24 }} />
);

const SectionLabel = ({ text }) => (
  <Text style={{
    fontSize: 10,
    fontWeight: W.semibold,
    color: C.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  }}>{text}</Text>
);

// ─── MAIN APP ────────────────────────────────────────────
export default function App() {
  const [booted, setBooted]             = useState(false);
  const [tab, setTab]                   = useState('cartao');
  const [mostrarMais, setMostrarMais]   = useState(false);
  const [contatoAtivo, setContatoAtivo] = useState('email');

  const [sk, setSk] = useState({
    python: true,
    sql:    true,
    js:     true,
    ml:     true,
    flask:  false,
    java:   false,
    rn:     false,
  });
  const toggleSk = key => setSk(prev => ({ ...prev, [key]: !prev[key] }));

  const mainFade = useRef(new Animated.Value(0)).current;

  const enter = () => {
    setBooted(true);
    Animated.timing(mainFade, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  };

  if (!booted) return <IntroScreen onEnter={enter} />;

  // ── PERFIL ────────────────────────────────────────────
  const renderCartao = () => (
    <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

      {/* Identity */}
      <Text style={s.bigName}>
        Luis Fernando{'\n'}
        <Text style={s.bigNameAccent}>Vieira</Text>
      </Text>
      <Text style={s.tagline}>Backend Developer  ·  ML Engineer em formação</Text>
      <Text style={s.location}>Ourinhos, São Paulo</Text>

      <Divider />

      {/* About */}
      <SectionLabel text="Sobre" />
      <Text style={s.bodyText}>
        Estudante do 3º ano do Ensino Médio Técnico em Informática,
        com foco em desenvolvimento backend e aplicações orientadas a dados.
      </Text>

      <TouchableOpacity
        style={s.linkBtn}
        onPress={() => setMostrarMais(!mostrarMais)}
        activeOpacity={0.7}
      >
        <Text style={s.linkBtnText}>{mostrarMais ? 'Ler menos' : 'Ler mais'}</Text>
      </TouchableOpacity>

      {mostrarMais && (
        <View style={{ marginTop: 16, gap: 12 }}>
          <Text style={s.bodyText}>
            Experiência com Python para análise e modelagem de dados, com projetos
            organizados em funções e classes. Conhecimento em MySQL, PHP, APIs REST,
            Git, Flask e Streamlit.
          </Text>
          <Text style={s.bodyText}>
            Projeto atual: previsão de séries temporais com redes neurais LSTM
            aplicadas ao mercado de criptomoedas.
          </Text>
        </View>
      )}

      <View style={s.statusRow}>
        <Text style={s.statusLabel}>Detalhes visíveis</Text>
        <View style={[s.pill, mostrarMais && s.pillActive]}>
          <Text style={[s.pillText, mostrarMais && s.pillTextActive]}>
            {mostrarMais ? 'Sim' : 'Não'}
          </Text>
        </View>
      </View>

      <Divider />

      {/* Focus */}
      <SectionLabel text="Foco atual" />
      <View style={{ gap: 10 }}>
        {[
          { label: 'Deep Learning', sub: 'LSTM · séries temporais' },
          { label: 'Backend',       sub: 'Python · Flask · APIs' },
          { label: 'Dados',         sub: 'Análise · Modelagem' },
        ].map((f, i) => (
          <View key={i} style={s.focusCard}>
            <Text style={s.focusLabel}>{f.label}</Text>
            <Text style={s.focusSub}>{f.sub}</Text>
          </View>
        ))}
      </View>

      <Divider />

      {/* Terminal */}
      <SectionLabel text="Stack" />
      <View style={s.terminal}>
        <View style={s.termBar}>
          <View style={[s.termDot, { backgroundColor: '#FF5F57' }]} />
          <View style={[s.termDot, { backgroundColor: '#FFBC2E' }]} />
          <View style={[s.termDot, { backgroundColor: '#28C840' }]} />
        </View>
        <View style={s.termBody}>
          <Text style={s.termLine}>
            <Text style={{ color: C.textMuted }}>$ </Text>
            <Text style={{ color: C.accent }}>cat</Text>
            <Text style={{ color: C.textMuted }}> stack.txt</Text>
          </Text>
          {[
            ['Python',                     C.accent],
            ['MySQL · Flask · Streamlit',  C.textSub],
            ['Git · GitHub',               C.textSub],
            ['Machine Learning · LSTM',    C.gold],
            ['React Native (aprendendo)',   C.textMuted],
          ].map(([line, color], i) => (
            <Text key={i} style={[s.termLine, { color }]}>{'  '}{line}</Text>
          ))}
        </View>
      </View>

    </ScrollView>
  );

  // ── CONTATOS ──────────────────────────────────────────
  const renderContatos = () => {
    const tabItems = [
      { key: 'email',    label: 'E-mail' },
      { key: 'telefone', label: 'Telefone' },
      { key: 'linkedin', label: 'LinkedIn' },
    ];
    const contactValues = {
      email:    'luis.fernando@email.com',
      telefone: '(14) 99876-5432',
      linkedin: 'linkedin.com/in/luisfernandovieira',
    };
    const links = [
      { label: 'GitHub',    val: 'github.com/luisvfernando7-a11y', url: 'https://github.com/luisvfernando7-a11y' },
      { label: 'Instagram', val: '@luis_galvani08',                 url: null },
      { label: 'Portfólio', val: 'luisgalvani.vercel.app',         url: 'https://luisgalvani.vercel.app' },
    ];

    return (
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.pageTitle}>Contatos</Text>

        {/* Segment */}
        <View style={s.segment}>
          {tabItems.map(t => (
            <TouchableOpacity
              key={t.key}
              style={[s.segBtn, contatoAtivo === t.key && s.segBtnActive]}
              onPress={() => setContatoAtivo(t.key)}
              activeOpacity={0.8}
            >
              <Text style={[s.segText, contatoAtivo === t.key && s.segTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active */}
        <View style={s.activeContact}>
          <Text style={s.activeContactLabel}>
            {tabItems.find(t => t.key === contatoAtivo)?.label}
          </Text>
          <Text style={s.activeContactVal}>{contactValues[contatoAtivo]}</Text>
          {contatoAtivo === 'linkedin' && (
            <TouchableOpacity
              style={s.openBtn}
              onPress={() => Linking.openURL('https://www.linkedin.com/in/luisfernandovieira/')}
              activeOpacity={0.75}
            >
              <Text style={s.openBtnText}>Abrir perfil</Text>
            </TouchableOpacity>
          )}
        </View>

        <Divider />

        <SectionLabel text="Outros" />
        {links.map((l, i) => (
          <TouchableOpacity
            key={i}
            style={[s.linkRow, i === links.length - 1 && { borderBottomWidth: 0 }]}
            onPress={() => l.url && Linking.openURL(l.url)}
            activeOpacity={0.7}
          >
            <View style={{ flex: 1 }}>
              <Text style={s.linkRowLabel}>{l.label}</Text>
              <Text style={s.linkRowVal}>{l.val}</Text>
            </View>
            {l.url && <Text style={s.linkArrow}>›</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // ── SKILLS ────────────────────────────────────────────
  const renderSkills = () => {
    const skills = [
      { key: 'python', label: 'Python',          onLabel: 'Utilizo',    offLabel: 'Quero aprender' },
      { key: 'sql',    label: 'SQL / MySQL',      onLabel: 'Utilizo',    offLabel: 'Quero aprender' },
      { key: 'js',     label: 'JavaScript',       onLabel: 'Utilizo',    offLabel: 'Quero aprender' },
      { key: 'ml',     label: 'Machine Learning', onLabel: 'Estudando',  offLabel: 'Quero aprender' },
      { key: 'flask',  label: 'Flask',            onLabel: 'Utilizei',   offLabel: 'Quero aprender' },
      { key: 'java',   label: 'Java',             onLabel: 'Explorando', offLabel: 'Quero aprender' },
      { key: 'rn',     label: 'React Native',     onLabel: 'Aprendendo', offLabel: 'Quero aprender' },
    ];

    const marked = skills.filter(sk_ => sk[sk_.key]).length;
    const pct    = Math.round((marked / skills.length) * 100);

    return (
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.pageTitle}>Habilidades</Text>

        {/* Summary bar */}
        <View style={{ marginBottom: 24 }}>
          <View style={s.summaryRow}>
            <Text style={s.summaryText}>
              <Text style={{ color: C.gold, fontWeight: W.semibold }}>{marked}</Text>
              <Text style={{ color: C.textMuted }}> de {skills.length} marcadas</Text>
            </Text>
            <Text style={s.summaryPct}>{pct}%</Text>
          </View>
          <View style={s.progressBg}>
            <View style={[s.progressFill, { width: `${pct}%` }]} />
          </View>
        </View>

        {skills.map((skill, i) => {
          const active = sk[skill.key];
          return (
            <View
              key={skill.key}
              style={[s.skillItem, i === skills.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={s.skillLeft}>
                <View style={[s.skillDot, active && s.skillDotActive]} />
                <View>
                  <Text style={[s.skillName, active && { color: C.text }]}>{skill.label}</Text>
                  <Text style={s.skillStatus}>{active ? skill.onLabel : skill.offLabel}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[s.toggleBtn, active && s.toggleBtnActive]}
                onPress={() => toggleSk(skill.key)}
                activeOpacity={0.75}
              >
                <Text style={[s.toggleText, active && s.toggleTextActive]}>
                  {active ? 'Remover' : 'Adicionar'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const tabs = [
    { key: 'cartao',   label: 'Perfil' },
    { key: 'contatos', label: 'Contatos' },
    { key: 'skills',   label: 'Skills' },
  ];
  const subtitles = {
    cartao:   'Perfil',
    contatos: 'Contatos',
    skills:   'Habilidades',
  };
  const screens = { cartao: renderCartao, contatos: renderContatos, skills: renderSkills };

  return (
    <Animated.View style={[s.root, { opacity: mainFade }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* HEADER */}
      <View style={s.header}>
        <View style={s.headerInner}>
          <Text style={s.headerName}>Luis Galvani</Text>
          <View style={s.onlineDot} />
        </View>
        <Text style={s.headerSub}>{subtitles[tab]}</Text>
      </View>

      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        {screens[tab]()}
      </View>

      {/* FOOTER NAV */}
      <View style={s.footer}>
        {tabs.map(t => {
          const active = tab === t.key;
          return (
            <TouchableOpacity
              key={t.key}
              style={[s.footerTab, active && s.footerTabActive]}
              onPress={() => setTab(t.key)}
              activeOpacity={0.8}
            >
              <Text style={[s.footerTabText, active && s.footerTabTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
}

// ─── STYLES ──────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  // HEADER
  header: {
    backgroundColor: C.bg2,
    paddingTop: 56,
    paddingBottom: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  headerName: {
    fontSize: 17,
    fontWeight: W.semibold,
    color: C.text,
    letterSpacing: -0.3,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.success,
    marginTop: 1,
  },
  headerSub: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: W.regular,
  },

  // SCROLL
  scroll: { padding: 24, paddingBottom: 40 },

  // IDENTITY
  bigName: {
    fontSize: 34,
    fontWeight: W.bold,
    color: C.text,
    letterSpacing: -1,
    lineHeight: 40,
    marginBottom: 10,
  },
  bigNameAccent: { color: C.gold },
  tagline: {
    fontSize: 14,
    color: C.textSub,
    fontWeight: W.regular,
    marginBottom: 6,
    lineHeight: 20,
  },
  location: { fontSize: 12, color: C.textMuted },

  // BODY
  bodyText: {
    fontSize: 14,
    color: C.textSub,
    lineHeight: 22,
    fontWeight: W.regular,
  },

  // LINK BTN
  linkBtn: { marginTop: 14, alignSelf: 'flex-start' },
  linkBtnText: {
    fontSize: 13,
    color: C.gold,
    fontWeight: W.medium,
  },

  // STATUS
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statusLabel: { fontSize: 13, color: C.textMuted },
  pill: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
  },
  pillActive: {
    backgroundColor: C.goldFaint,
    borderColor: C.goldMuted,
  },
  pillText: { fontSize: 12, color: C.textMuted, fontWeight: W.medium },
  pillTextActive: { color: C.gold },

  // FOCUS CARDS
  focusCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 16,
  },
  focusLabel: {
    fontSize: 14,
    fontWeight: W.semibold,
    color: C.text,
    marginBottom: 3,
  },
  focusSub: { fontSize: 12, color: C.textMuted },

  // TERMINAL
  terminal: {
    backgroundColor: C.bg2,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  termBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: C.surface,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  termDot: { width: 9, height: 9, borderRadius: 5 },
  termBody: { padding: 16, gap: 3 },
  termLine: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: C.textSub,
    lineHeight: 20,
  },

  // PAGE TITLE
  pageTitle: {
    fontSize: 22,
    fontWeight: W.bold,
    color: C.text,
    letterSpacing: -0.5,
    marginBottom: 24,
  },

  // SEGMENT
  segment: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 3,
    marginBottom: 20,
    gap: 2,
  },
  segBtn: { flex: 1, paddingVertical: 9, borderRadius: 6, alignItems: 'center' },
  segBtnActive: {
    backgroundColor: C.bg2,
    borderWidth: 1,
    borderColor: C.border,
  },
  segText: { fontSize: 13, color: C.textMuted, fontWeight: W.medium },
  segTextActive: { color: C.text },

  // ACTIVE CONTACT
  activeContact: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 20,
    gap: 6,
  },
  activeContactLabel: {
    fontSize: 10,
    color: C.textMuted,
    fontWeight: W.semibold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  activeContactVal: {
    fontSize: 16,
    color: C.text,
    fontWeight: W.semibold,
  },
  openBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: C.blueFaint,
    borderWidth: 1,
    borderColor: C.blue,
  },
  openBtnText: {
    fontSize: 13,
    color: C.accent,
    fontWeight: W.medium,
  },

  // LINK ROWS
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  linkRowLabel: {
    fontSize: 11,
    color: C.textMuted,
    fontWeight: W.medium,
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  linkRowVal: { fontSize: 14, color: C.text },
  linkArrow: { fontSize: 20, color: C.textMuted, paddingLeft: 12 },

  // SKILLS SUMMARY
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  summaryText: { fontSize: 13 },
  summaryPct: { fontSize: 13, color: C.textMuted },
  progressBg: {
    height: 2,
    backgroundColor: C.border,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: C.gold,
    borderRadius: 1,
  },

  // SKILL ITEMS
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  skillLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  skillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.border,
  },
  skillDotActive: { backgroundColor: C.gold },
  skillName: {
    fontSize: 14,
    color: C.textSub,
    fontWeight: W.medium,
    marginBottom: 1,
  },
  skillStatus: { fontSize: 11, color: C.textMuted },

  // TOGGLE
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
  },
  toggleBtnActive: {
    backgroundColor: C.goldFaint,
    borderColor: C.goldMuted,
  },
  toggleText: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: W.medium,
  },
  toggleTextActive: { color: C.gold },

  // FOOTER
  footer: {
    flexDirection: 'row',
    backgroundColor: C.bg2,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 10,
    paddingBottom: 28,
    paddingHorizontal: 8,
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  footerTabActive: { backgroundColor: C.surface },
  footerTabText: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: W.medium,
  },
  footerTabTextActive: {
    color: C.gold,
    fontWeight: W.semibold,
  },
});