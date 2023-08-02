import { ConsoleLayout } from '@/components/ConsoleLayout';

const Primary = () => (
  <div className="prose prose-invert">
    <h1>IE Portals Website Builder</h1>
    <p>This tool is currently in the alpha stage and is primarily designed for internal use, with no immediate plans for client-facing implementation. The current objective is to create an internal-facing tool to streamline the styling and localization process for new tenants, providing the added benefit of enabling non-developers to make changes efficiently.</p>
  </div>
);

export { getServerSideProps } from '@/ssp/console/website-builder/index';
export default function Page({ consoleLayout }) {
  return (
    <ConsoleLayout
      primary={Primary}
      {...consoleLayout}
    />
  )
}
