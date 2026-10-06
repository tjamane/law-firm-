'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Award, Headphones } from 'lucide-react';

// Why choose us items
const reasons = [
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description:
      'Your data is protected with enterprise-grade encryption and compliance with legal industry standards.',
  },
  {
    icon: Clock,
    title: 'Save 10+ Hours Weekly',
    description:
      'Automate repetitive tasks and streamline workflows to focus on billable work that matters.',
  },
  {
    icon: Award,
    title: 'Industry Recognition',
    description:
      'Trusted by top law firms worldwide and recognized as a leader in legal technology solutions.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description:
      'Our expert support team understands legal workflows and is available around the clock to help.',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Leading Law Firms{' '}
              <span className="text-accent">Choose Us</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We understand the unique challenges of legal practice management.
              Our platform is built by legal professionals, for legal
              professionals.
            </p>

            {/* Reasons list */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {reasons.map((reason) => (
                <motion.div
                  key={reason.title}
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <reason.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-2xl p-8 lg:p-12">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-accent/10 rounded-full blur-xl" />
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

              {/* Stats cards */}
              <div className="relative space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-card rounded-xl p-6 shadow-lg border border-border"
                >
                  <div className="text-4xl font-bold text-accent mb-1">40%</div>
                  <div className="text-muted-foreground">
                    Increase in productivity
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-card rounded-xl p-6 shadow-lg border border-border ml-8"
                >
                  <div className="text-4xl font-bold text-primary mb-1">
                    99.9%
                  </div>
                  <div className="text-muted-foreground">Uptime guarantee</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-card rounded-xl p-6 shadow-lg border border-border"
                >
                  <div className="text-4xl font-bold text-accent mb-1">
                    500+
                  </div>
                  <div className="text-muted-foreground">
                    Law firms trust us
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
